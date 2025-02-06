import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDb } from "./src/config/db.js";
import redisClient from "./src/config/redis.js";
import cookieParser from "cookie-parser";
import executeCode from "./src/utils/executeCode.js";

import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languages = {
  Java: "java",
  Python: "python3",
  C: "gcc",
  "C++": "g++",
  PHP: "php",
  "Go-lang": "go",
  Swift: "swift",
  Rust: "rustc",
};

app.post("/api/run-code", (req, res) => {
  const { language, code } = req.body;

  if (
    !languages[language] &&
    !["Java", "C", "C++", "Go-lang", "Swift", "Rust"].includes(language)
  ) {
    return res.status(400).json({ error: "Language not supported" });
  }

  const filePath = path.join(
    __dirname,
    "temp",
    language === "Java" ? "Main.java" : `temp.${language.toLowerCase()}`
  );
  const outputPath = path.join(__dirname, "temp", "output.txt");

  // Ensure the temp directory exists
  if (!fs.existsSync(path.join(__dirname, "temp"))) {
    fs.mkdirSync(path.join(__dirname, "temp"));
  }

  // Write the code to a temporary file
  fs.writeFileSync(filePath, code);

  let command;
  if (language === "Java") {
    command = `javac ${filePath} && java -cp ${__dirname}/temp Main`;
  } else if (language === "C") {
    command = `gcc ${filePath} -o temp/output && temp/output`;
  } else if (language === "C++") {
    command = `g++ ${filePath} -o temp/output && temp/output`;
  } else if (language === "Go-lang") {
    command = `go run ${filePath}`;
  } else if (language === "Swift") {
    command = `swift ${filePath}`;
  } else if (language === "Rust") {
    command = `rustc ${filePath} && ./temp/temp`;
  } else {
    command = `${languages[language]} ${filePath}`;
  }

  // Execute the command
  exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ output: stdout });
  });
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
