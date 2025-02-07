import DsaProblem from "../models/dsaproblem.models.js";
import redisClient from "../config/redis.js";
import { validationResult } from "express-validator";
import slugify from "slugify";

import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new DSA problem
export const createProblem = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, ...rest } = req.body;

    const slug = slugify(title, { lower: true, strict: true });

    // Check if the slug already exists
    const existingSlug = await DsaProblem.findOne({ slug });
    if (existingSlug) {
      return res
        .status(409)
        .json({ message: "A problem with this title already exists." });
    }

    const newProblem = new DsaProblem({ ...rest, title, slug });
    await newProblem.save();

    res.status(201).json(newProblem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Get one DSA problem by Slug
export const getOneProblemBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    // Check if the problem is cached
    const cachedProblem = await redisClient.get(`problem:slug:${slug}`);
    if (cachedProblem) {
      return res.status(200).json(JSON.parse(cachedProblem));
    }

    // Fetch the problem from the database
    const problem = await DsaProblem.findOne({ slug });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Cache the problem
    await redisClient.set(
      `problem:slug:${slug}`,
      JSON.stringify(problem),
      "EX",
      3600
    );

    res.status(200).json(problem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all DSA problems
export const getAllProblems = async (req, res) => {
  try {
    const cachedProblems = await redisClient.get("problems");
    if (cachedProblems) {
      return res.status(200).json(JSON.parse(cachedProblems));
    }

    const problems = await DsaProblem.find();
    await redisClient.set("problems", JSON.stringify(problems), "EX", 3600);
    res.status(200).json(problems);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a DSA problem by ID
export const updateProblem = async (req, res) => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedProblem = await DsaProblem.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    await redisClient.del(`problem:${id}`);
    await redisClient.del("problems");
    res.status(200).json(updatedProblem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a DSA problem by ID
export const deleteProblem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProblem = await DsaProblem.findByIdAndDelete(id);
    if (!deletedProblem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    await redisClient.del(`problem:${id}`);
    await redisClient.del("problems");
    res.status(200).json({ message: "Problem deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get input for a problem by slug
export const getProblemInputBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    // Check Redis cache first
    const cachedInput = await redisClient.get(`problem:input:${slug}`);
    if (cachedInput) {
      return res.status(200).json({ input: JSON.parse(cachedInput) });
    }

    // Fetch problem from database
    const problem = await DsaProblem.findOne({ slug });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found" });
    }

    // Ensure input exists
    if (!problem.input || problem.input.length === 0) {
      return res.status(400).json({ message: "No input data available" });
    }

    // Store input in cache for quick access
    await redisClient.set(
      `problem:input:${slug}`,
      JSON.stringify(problem.input),
      "EX",
      3600 // Cache for 1 hour
    );

    res.status(200).json({ input: problem.input });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function compareOutput(output, expected) {
  return output.trim() === expected.trim();
}

function runUserCode(language, code, inputData) {
  return new Promise((resolve, reject) => {
    let fileName, compileCmd, runCmd;
    const workDir = path.join(__dirname, "temp");

    if (!fs.existsSync(workDir)) {
      fs.mkdirSync(workDir);
    }

    if (language === "java") {
      fileName = "Solution.java";
      fs.writeFileSync(path.join(workDir, fileName), code);
      compileCmd = `javac ${fileName}`;
      runCmd = `java Solution`;
    } else if (language === "python") {
      fileName = "solution.py";
      fs.writeFileSync(path.join(workDir, fileName), code);
      runCmd = `python3 ${fileName}`;
    } else if (language === "c++") {
      fileName = "solution.cpp";
      fs.writeFileSync(path.join(workDir, fileName), code);
      compileCmd = `g++ ${fileName} -o solution`;
      runCmd = `./solution`;
    } else if (language === "javascript") {
      fileName = "solution.js";
      fs.writeFileSync(path.join(workDir, fileName), code);
      runCmd = `node ${fileName}`;
    } else {
      return reject(new Error("Unsupported language"));
    }
    const executeCommand = (cmd, input) => {
      return new Promise((res, rej) => {
        const process = exec(
          cmd,
          { cwd: workDir, timeout: 2000 },
          (error, stdout, stderr) => {
            if (error) {
              return rej(error);
            }
            res(stdout);
          }
        );
        if (input) {
          process.stdin.write(input);
          process.stdin.end();
        }
      });
    };

    (async () => {
      try {
    
        if (compileCmd) {
          await executeCommand(compileCmd, "");
        }

        const output = await executeCommand(runCmd, inputData);
        resolve(output);
      } catch (error) {
        reject(error);
      }
    })();
  });
}
export const submitSolution = async (req, res) => {
  try {
    const { language, code, slug } = req.body;
    if (!language || !code || !slug) {
      return res
        .status(400)
        .json({ message: "language, code, and slug are required." });
    }

    // Fetch the problem from the database (using the slug)
    const problem = await DsaProblem.findOne({ slug });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found." });
    }

    // Ensure the problem has test cases
    const testCases = problem.testCases;
    if (!testCases || testCases.length === 0) {
      return res
        .status(400)
        .json({ message: "No test cases available for this problem." });
    }

    let results = [];

    // Iterate through each test case
    for (const testCase of testCases) {
      // In case testCase.input/output are arrays, join them into a string
      const input = Array.isArray(testCase.input)
        ? testCase.input.join("\n")
        : testCase.input;
      const expectedOutput = Array.isArray(testCase.output)
        ? testCase.output.join("\n")
        : testCase.output;
      const startTime = Date.now();
      try {
        // Execute the user code using our helper
        const output = await runUserCode(language.toLowerCase(), code, input);
        const executionTime = Date.now() - startTime;
        const passed = compareOutput(output, expectedOutput);
        results.push({
          testCaseId: testCase._id,
          output: output.trim(),
          executionTime,
          passed,
        });
      } catch (error) {
        results.push({
          testCaseId: testCase._id,
          error: error.message,
          passed: false,
        });
      }
    }

    const allPassed = results.every((result) => result.passed);
    return res.status(200).json({ success: allPassed, results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
