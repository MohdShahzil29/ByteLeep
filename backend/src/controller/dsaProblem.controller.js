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
