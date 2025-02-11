import express from "express";
import slugify from "slugify";
import MockTestCategoryModels from "../models/MockTestCategory.models.js";

const router = express.Router();

router.post("/create-mock-category", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const existingTestCategory = await MockTestCategoryModels.findOne({
      title,
    });

    if (existingTestCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }

    // Create a new category
    const newCategory = new MockTestCategoryModels({
      title,
      slug: slugify(title, { lower: true }),
    });

    await newCategory.save();

    res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
