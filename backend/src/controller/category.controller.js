import categoryModels from "../models/category.models.js";
import slugify from "slugify";
import redisClient from "../config/redis.js";
import DsaProblems from "../models/dsaproblem.models.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingCategory = await categoryModels.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exisits",
      });
    }
    const category = await new categoryModels({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in Category",
    });
  }
};

export const getAllCategoryController = async (req, res) => {
  try {
    const cacheKey = "allCategories";

    // Check if data is in Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).send({
        success: true,
        message: "Categories retrieved from cache",
        categories: JSON.parse(cachedData),
      });
    }

    // Fetch from database if not in cache
    const categories = await categoryModels.find({});
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(categories)); // Cache for 1 hour

    res.status(200).send({
      success: true,
      message: "All categories retrieved successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving categories",
    });
  }
};

// Get category by slug with Redis caching
export const getCategoryBySlugController = async (req, res) => {
  try {
    const { slug } = req.params.slug;
    const cacheKey = `category:${slug}`;

    // Check if data is in Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).send({
        success: true,
        message: "Category retrieved from cache",
        category: JSON.parse(cachedData),
      });
    }

    // Fetch from database if not in cache
    const category = await categoryModels.findOne({ slug });

    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    await redisClient.setEx(cacheKey, 3600, JSON.stringify(category)); // Cache for 1 hour

    res.status(200).send({
      success: true,
      message: "Category retrieved successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving category",
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the category
    const deletedCategory = await categoryModels.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // Invalidate the cache
    await redisClient.del("allCategories");

    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error deleting category",
    });
  }
};

export const getDsaProblemsByCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;
    const cacheKey = `dsaProblems:${slug}`;

    // Check if data is in Redis cache
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).send({
        success: true,
        message: "DSA problems retrieved from cache",
        problems: JSON.parse(cachedData),
      });
    }

    // Find category by slug
    const category = await categoryModels.findOne({ slug });
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // Find all problems related to the category
    const problems = await DsaProblems.find({ category: category._id });

    // Cache the result for 1 hour
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(problems));

    res.status(200).send({
      success: true,
      message: "DSA problems retrieved successfully",
      problems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error retrieving DSA problems",
    });
  }
};

export const filterDsaProblemsController = async (req, res) => {
  try {
    const { category, difficulty, topicTags } = req.query;

    const query = {};

    // Add category filter if provided
    if (category) {
      query.category = category; // Ensure category is stored as an ObjectId in the DB
    }

    // Add difficulty filter if provided
    if (difficulty) {
      query.difficulty = difficulty;
    }

    // Add topicTags filter (supporting multiple selections)
    if (topicTags) {
      const tagsArray = topicTags.split(",");
      query.topicTags = { $in: tagsArray };
    }

    // console.log("Generated Query:", JSON.stringify(query, null)); // Debugging

    const problems = await DsaProblems.find(query).populate("category");

    res.status(200).send({
      success: true,
      message: "DSA problems filtered successfully",
      problems,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error filtering DSA problems",
    });
  }
};
