import DsaProblem from "../models/dsaproblem.models.js";
import redisClient from "../config/redis.js";
import slugify from "slugify";

import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new DSA problem
export const createProblem = async (req, res) => {
  try {
    const {
      title,
      difficulty,
      points,
      description,
      input,
      output,
      shortExplanation,
      constraints,
      companyTags,
      topicTags,
      category,
      testCases,
      expectedTimeSpaceComplexity,
    } = req.body;
    // Validate required fields
    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Title is required and must be a string." });
    }

    if (!difficulty || !["Easy", "Medium", "Hard"].includes(difficulty)) {
      return res
        .status(400)
        .json({ error: "Difficulty must be Easy, Medium, or Hard." });
    }

    if (!points || typeof points !== "number") {
      return res.status(400).json({ error: "Points must be a number." });
    }

    if (!description || typeof description !== "string") {
      return res
        .status(400)
        .json({ error: "Description is required and must be a string." });
    }

    const slug = slugify(title, { lower: true, strict: true });

    // Check existing problem
    const existingProblem = await DsaProblem.findOne({ slug });
    if (existingProblem) {
      return res
        .status(400)
        .json({ error: "Problem with the same title already exists." });
    }

    // Create new problem
    const newProblem = new DsaProblem({
      title,
      difficulty,
      points,
      description,
      input,
      output,
      shortExplanation,
      constraints,
      companyTags,
      topicTags,
      category,
      slug,
      testCases,
      expectedTimeSpaceComplexity,
    });

    await newProblem.save();

    res
      .status(201)
      .json({ message: "Problem created successfully!", problem: newProblem });
  } catch (error) {
    console.error("Error creating problem:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
// Get one DSA problem by Slug
export const getOneProblemBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
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
  // const errors = validationResult(req);
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

export const getAllTopicTagsController = async (req, res) => {
  try {
    const redisKey = "allTopicTags";
    // Check if data exists in Redis cache
    const cachedTags = await redisClient.get(redisKey);
    if (cachedTags) {
      return res.status(200).json({
        success: true,
        message: "All topic tags retrieved from cache successfully",
        allTags: JSON.parse(cachedTags),
      });
    }

    // Fetch from database if not in cache
    const allTags = await DsaProblem.distinct("topicTags");
    // Cache the result with an expiration time of 3600 seconds (1 hour)
    await redisClient.set(redisKey, JSON.stringify(allTags), "EX", 3600);

    res.status(200).json({
      success: true,
      message: "All topic tags retrieved successfully",
      allTags,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving all topic tags",
      error: error.message,
    });
  }
};

export const getCompanyList = async (req, res) => {
  try {
    const redisKey = "companyList";
    const cachedCompanies = await redisClient.get(redisKey);
    if (cachedCompanies) {
      return res.status(200).json({
        success: true,
        message: "Company list retrieved from cache successfully",
        companyList: JSON.parse(cachedCompanies),
      });
    }

    const companyList = await DsaProblem.distinct("companyTags");
    await redisClient.set(redisKey, JSON.stringify(companyList), "EX", 3600);

    res.status(200).json({
      success: true,
      message: "Company list retrieved successfully",
      companyList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving company list",
      error: error.message,
    });
  }
};

export const getDefficultyTags = async (req, res) => {
  try {
    const redisKey = "difficultyTags";
    const cachedDifficulty = await redisClient.get(redisKey);
    if (cachedDifficulty) {
      return res.status(200).json({
        success: true,
        message: "Difficulty tags retrieved from cache successfully",
        difficulty: JSON.parse(cachedDifficulty),
      });
    }

    const difficulty = await DsaProblem.distinct("difficulty");
    await redisClient.set(redisKey, JSON.stringify(difficulty), "EX", 3600);

    res.status(200).json({
      success: true,
      message: "Difficulty tags retrieved successfully",
      difficulty,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving difficulty tags",
      error: error.message,
    });
  }
};

export const getFilteredProblems = async (req, res) => {
  try {
    const { companies, topics, difficulty } = req.query;
    let filter = {};

    if (companies) {
      filter.companyTags = { $in: companies.split(",") };
    }

    if (topics) {
      filter.topicTags = { $in: topics.split(",") };
    }

    if (difficulty) {
      filter.difficulty = { $in: difficulty.split(",") };
    }

    const problems = await DsaProblem.find(filter);
    return res.status(200).json({ success: true, problems });
  } catch (error) {
    console.error("Error fetching filtered problems:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const relatedProblems = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const cacheKey = `relatedProblems:${pid}:${cid}`;

    // Attempt to retrieve cached data
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).send({
        success: true,
        relatedProblem: JSON.parse(cachedData),
      });
    }
    const relatedProblem = await DsaProblem.find({
      category: cid,
      _id: { $ne: pid },
    })
      .limit(3)
      .populate("category");
    await redisClient.set(cacheKey, JSON.stringify(relatedProblem), {
      EX: 60, // time in seconds
    });

    res.status(200).send({
      success: true,
      relatedProblem,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      success: false,
      message: "Error while getting related problems",
      error,
    });
  }
};

function extractNumbers(str) {
  return str.match(/\b\d+\b/g) || [];
}

function extractRelevantNumbers(output, expectedNumbersLength) {
  let sectionOutput = "";
  if (expectedNumbersLength === 6) {
    // Look for "Reversed arr1:" and take the text until "Reversed arr2:" (if present)
    const parts = output.split("Reversed arr1:");
    if (parts.length > 1) {
      sectionOutput = parts[1].split("Reversed arr2:")[0];
    } else {
      sectionOutput = output;
    }
  } else if (expectedNumbersLength === 5) {
    // Look for "Reversed arr2:" and take the text after it.
    const parts = output.split("Reversed arr2:");
    if (parts.length > 1) {
      sectionOutput = parts[1];
    } else {
      sectionOutput = output;
    }
  } else {
    sectionOutput = output;
  }
  return extractNumbers(sectionOutput);
}

// ----------------------
// Code Execution Functions
// ----------------------

function runUserCode(language, code, inputData) {
  return new Promise((resolve, reject) => {
    let fileName, compileCmd, runCmd;
    const workDir = path.join(__dirname, "temp");

    if (!fs.existsSync(workDir)) {
      fs.mkdirSync(workDir);
    }

    if (language === "java") {
      const classNameMatch = code.match(/public\s+class\s+(\w+)/);
      if (classNameMatch && classNameMatch[1]) {
        const className = classNameMatch[1];
        fileName = `${className}.java`;
        fs.writeFileSync(path.join(workDir, fileName), code);
        compileCmd = `javac ${fileName}`;
        runCmd = `java ${className}`;
      } else {
        return reject(
          new Error("Could not determine public class name in Java code.")
        );
      }
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

    const problem = await DsaProblem.findOne({ slug });
    if (!problem) {
      return res.status(404).json({ message: "Problem not found." });
    }

    const testCases = problem.testCases;
    if (!testCases || testCases.length === 0) {
      return res
        .status(400)
        .json({ message: "No test cases available for this problem." });
    }

    let results = [];

    for (const testCase of testCases) {
      const input = Array.isArray(testCase.input)
        ? testCase.input.join(" ")
        : testCase.input;
      const expectedOutput = Array.isArray(testCase.output)
        ? testCase.output.join(" ")
        : testCase.output;
      const startTime = Date.now();
      try {
        const output = await runUserCode(language.toLowerCase(), code, input);
        const executionTime = Date.now() - startTime;
        const passed =
          normalizeOutput(output.trim()) ===
          normalizeOutput(expectedOutput.trim());
        results.push({
          testCaseId: testCase._id,
          output: output.trim(),
          expectedOutput, // Include expected output in the response
          executionTime: `${executionTime}ms`,
          passed,
        });
      } catch (error) {
        results.push({
          testCaseId: testCase._id,
          error: error.message,
          expectedOutput, // Include expected output in the response
          passed: false,
        });
      }
    }

    const passedCount = results.filter((result) => result.passed).length;
    const allPassed = results.every((result) => result.passed);

    return res.status(200).json({
      success: allPassed,
      passedCount,
      totalTestCases: testCases.length,
      results,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

function normalizeOutput(str) {
  return str
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .trim();
}
