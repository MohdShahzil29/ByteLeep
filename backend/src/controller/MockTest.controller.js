import MockTestModel from "../models/MockTest.models.js";
import slugify from "slugify";
import redisClient from "../config/redis.js";
import UserModel from "../models/user.models.js";

export const createTestController = async (req, res) => {
  try {
    const { title, description, category, timer, questions } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !category ||
      !questions ||
      questions.length !== 5
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, category, and exactly 5 questions are required.",
      });
    }

    // Generate slug from title
    const slug = slugify(title, { lower: true });

    // Check if a test with the same title or slug already exists
    const existingTest = await MockTestModel.findOne({
      $or: [{ title }, { slug }],
    });

    if (existingTest) {
      return res.status(400).json({
        success: false,
        message: "Mock Test with this title or slug already exists.",
      });
    }

    // Create new test
    const newTest = new MockTestModel({
      title,
      slug,
      description,
      category,
      timer: timer || 930, // Default timer if not provided
      questions,
    });

    // Save test to database
    const savedTest = await newTest.save();

    return res.status(201).json({
      success: true,
      message: "Mock Test Created Successfully.",
      test: savedTest,
    });
  } catch (error) {
    console.error("Error creating mock test:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const getTestBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const cacheKey = `test:${slug}`;

    const cachedTest = await redisClient.get(cacheKey);
    if (cachedTest) {
      return res.json({ success: true, test: JSON.parse(cachedTest) });
    }

    const test = await MockTestModel.findOne({ slug });
    if (!test) {
      return res
        .status(404)
        .json({ success: false, message: "Mock Test not found." });
    }

    await redisClient.set(cacheKey, JSON.stringify(test), "EX", 3600);
    return res.json({ success: true, test });
  } catch (error) {
    console.error("Error fetching test by slug:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const cachedTests = await redisClient.get("all_tests");
    if (cachedTests) {
      return res.json({ success: true, tests: JSON.parse(cachedTests) });
    }

    const tests = await MockTestModel.find({});
    await redisClient.set("all_tests", JSON.stringify(tests), "EX", 3600);
    return res.json({ success: true, tests });
  } catch (error) {
    console.error("Error fetching all tests:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const searchTests = async (req, res) => {
  try {
    const { query } = req.query;
    // Redis cache key ke liye, query ko use kar rahe hain
    const cacheKey = `search:${query}`;

    // Check karein agar cache mein data available hai
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log("Cache hit for query:", query);
      return res.json({ success: true, tests: JSON.parse(cachedData) });
    }

    // Agar cache miss ho, to database se data fetch karein
    const tests = await MockTestModel.find({ title: new RegExp(query, "i") });

    // Cache mein result store karein, expiry time 60 seconds (aap isse adjust kar sakte hain)
    await redisClient.setEx(cacheKey, 60, JSON.stringify(tests));
    console.log("Cache miss for query:", query, "- caching result");

    return res.json({ success: true, tests });
  } catch (error) {
    console.error("Error searching tests:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTest = await MockTestModel.findByIdAndDelete(id);
    if (!deletedTest) {
      return res
        .status(404)
        .json({ success: false, message: "Mock Test not found." });
    }

    await redisClient.del("all_tests");
    await redisClient.del(`test:${deletedTest.slug}`);

    return res.json({
      success: true,
      message: "Mock Test deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting test:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const updateTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, timer, questions } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      !questions ||
      questions.length !== 5
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, category, and exactly 5 questions are required.",
      });
    }

    const updatedTest = await MockTestModel.findByIdAndUpdate(
      id,
      { title, description, category, timer, questions },
      { new: true }
    );

    if (!updatedTest) {
      return res
        .status(404)
        .json({ success: false, message: "Mock Test not found." });
    }

    await redisClient.del("all_tests");
    await redisClient.del(`test:${updatedTest.slug}`);

    return res.json({
      success: true,
      message: "Mock Test updated successfully.",
      test: updatedTest,
    });
  } catch (error) {
    console.error("Error updating test:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

export const isEnrolledTest = async (req, res) => {
  try {
    const { testId } = req.body;

    if (!testId) {
      return res.status(400).json({
        success: false,
        message: "Test ID is required to enroll in a test.",
      });
    }
    const user = req.user;

    if (user.enrolledTests && user.enrolledTests.includes(testId)) {
      return res.status(400).json({
        success: false,
        message: "User is already enrolled in this test.",
      });
    }

    user.enrolledTests = user.enrolledTests || [];
    user.enrolledTests.push(testId);

    await user.save();

    await user.populate({
      path: "enrolledTests",
      model: MockTestModel,
      select: "title slug description",
    });

    return res.status(200).json({
      success: true,
      message: "User enrolled successfully in the test.",
      enrolledTests: user.enrolledTests, // Populated course details
    });
  } catch (error) {
    console.error("Error enrolling user:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error.",
    });
  }
};

export const getUserEnrolledTests = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const user = await UserModel.findById(userId).populate({
      path: "enrolledTests",
      select: "title slug description",
    });

    if (!user || !user.enrolledTests || user.enrolledTests.length === 0) {
      return res.status(200).json({
        success: true,
        enrolledTests: [],
      });
    }

    return res.status(200).json({
      success: true,
      enrolledTests: user.enrolledTests,
    });
  } catch (error) {
    console.error("Error fetching enrolled tests:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch enrolled tests",
    });
  }
};

export const saveProgress = async (req, res) => {
  try {
    const { slug } = req.params;
    const { currentQuestionIndex, selectedOption, isSubmitted, isCorrect, attempts } = req.body;
    const userId = req.user.id || req.user._id;

    const test = await MockTestModel.findOne({ slug });
    if (!test) {
      return res.status(404).json({ success: false, message: "Mock Test not found." });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const progressIndex = user.progress.findIndex(p => p.testId.toString() === test._id.toString());
    if (progressIndex === -1) {
      user.progress.push({
        testId: test._id,
        currentQuestionIndex,
        selectedOption,
        isSubmitted,
        isCorrect,
        attempts,
      });
    } else {
      user.progress[progressIndex] = {
        testId: test._id,
        currentQuestionIndex,
        selectedOption,
        isSubmitted,
        isCorrect,
        attempts,
      };
    }

    await user.save();
    return res.status(200).json({ success: true, message: "Progress saved successfully." });
  } catch (error) {
    console.error("Error saving progress:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};

// Get Progress
export const getProgress = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id || req.user._id;

    const test = await MockTestModel.findOne({ slug });
    if (!test) {
      return res.status(404).json({ success: false, message: "Mock Test not found." });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    const progress = user.progress.find(p => p.testId.toString() === test._id.toString());
    if (!progress) {
      return res.status(404).json({ success: false, message: "No progress found for this test." });
    }

    return res.status(200).json({ success: true, progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return res.status(500).json({ success: false, message: "Server Error." });
  }
};