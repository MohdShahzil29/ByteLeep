import DsaProblem from "../models/dsaproblem.models.js";
import redisClient from "../config/redis.js";
import { validationResult } from "express-validator";
import slugify from "slugify";

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

const evaluateCode = async ({ code, language, input }) => {
  // Start timer
  const startTime = process.hrtime();
  let result;
  try {
    // For demonstration only: this example assumes JavaScript code.
    // Never use eval in production!
    result = eval(code);
  } catch (err) {
    throw new Error("Runtime Error: " + err.message);
  }
  // End timer and calculate elapsed time in ms
  const diff = process.hrtime(startTime);
  const timeTaken = diff[0] * 1e3 + diff[1] / 1e6; // convert seconds + nanoseconds to ms

  // Simulate memory usage (in MB) for demonstration purposes.
  const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;

  // Return simulated result along with timing/memory metrics
  return { result, timeTaken, memoryUsed };
};

const getTimeThreshold = (timeComplexity) => {
  switch (timeComplexity) {
    case "O(n)":
      return 1000; // e.g., 1000 ms
    case "O(n log n)":
      return 1500;
    case "O(n^2)":
      return 2000;
    default:
      return 1000;
  }
};

const getMemoryThreshold = (spaceComplexity) => {
  switch (spaceComplexity) {
    case "O(1)":
      return 50; // e.g., 50 MB
    case "O(n)":
      return 100;
    default:
      return 50;
  }
};

export const submitCodeController = async (req, res) => {
  try {
    const { slug, language, code } = req.body;
    console.log("Received Slug:", slug);

    // Validate input
    if (!slug || !language || !code) {
      return res.status(400).json({
        error: "Missing required fields: slug, language, or code.",
      });
    }

    // Retrieve the problem from the database using the slug
    const problem = await DsaProblem.findOne({ slug: slug });
    console.log("Retrieved Problem:", problem);

    if (!problem) {
      return res.status(404).json({ error: "Problem not found." });
    }

    const { testCases, expectedTimeSpaceComplexity } = problem;
    const { timeComplexity, spaceComplexity } = expectedTimeSpaceComplexity;

    // Define thresholds (in ms and MB respectively)
    const timeThreshold = getTimeThreshold(timeComplexity);
    const memoryThreshold = getMemoryThreshold(spaceComplexity);

    // Iterate through test cases
    for (const testCase of testCases) {
      const { result, timeTaken, memoryUsed } = await evaluateCode({
        code,
        language,
        input: testCase.input,
      });

      // Compare the evaluated result with the expected output
      if (JSON.stringify(result) !== JSON.stringify(testCase.output)) {
        return res
          .status(400)
          .json({ error: "Wrong Answer for one or more test cases." });
      }

      // Check the time threshold
      if (timeTaken > timeThreshold) {
        return res.status(400).json({
          error: "Time Complexity Error: Execution exceeded time threshold.",
        });
      }

      // Check the memory usage threshold
      if (memoryUsed > memoryThreshold) {
        return res.status(400).json({
          error: "Space Complexity Error: Execution exceeded memory threshold.",
        });
      }
    }

    // If all test cases pass
    return res.status(200).json({ message: "Accepted" });
  } catch (error) {
    console.error("Error in submitCodeController:", error);
    return res.status(500).json({ error: "Server Error: " + error.message });
  }
};
