import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDb } from "./src/config/db.js";
import redisClient from "./src/config/redis.js";
import cookieParser from "cookie-parser";
import executeCode from "./src/utils/executeCode.js";

dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

connectToDb();

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

// Routes
import userRoutes from "./src/routes/user.routes.js";
import dsaProblemRoutes from "./src/routes/dsaproblem.routes.js";
import categoryRoutes from "./src/routes/category.routes.js";

// Gemini API Integration
app.post("/api/gemini", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }
    const result = await model.generateContent(prompt);
    return res.status(200).json({ response: result.response.text() });
  } catch (error) {
    console.error("Error in Gemini API call:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate content from Gemini" });
  }
});

// 🔹 API to Execute Code
app.post("/api/execute", async (req, res) => {
  try {
    const { language, code } = req.body;
    
    console.log("Received request to execute code"); // Debugging
    console.log("Language:", language);
    console.log("Code:", code);

    if (!language || !code) {
      return res.status(400).json({ error: "Language and code are required" });
    }

    const output = await executeCode(language, code);

    console.log("Execution Output:", output); // Debugging
    res.json({ output });
  } catch (error) {
    console.error("Execution Error:", error); // Debugging
    res.status(500).json({ error: error.toString() });
  }
});


app.use("/api/user", userRoutes);
app.use("/api/dsa", dsaProblemRoutes);
app.use("/api/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Study Platform API!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
