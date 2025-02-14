import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDb } from "./src/config/db.js";
import redisClient from "./src/config/redis.js";
import cookieParser from "cookie-parser";

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
app.use(express.urlencoded({ extended: true }));

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

async function executeCode(language, code, inputData) {
  return new Promise((resolve, reject) => {
    let fileName, fileExtension, compileCommand, runCommand;

    if (language === "java") {
      fileExtension = "java";
      fileName = "Main"; // Java requires class name to match file name
      fs.writeFileSync(
        path.join(__dirname, `${fileName}.${fileExtension}`),
        code
      );
      compileCommand = `javac ${fileName}.${fileExtension}`;
      runCommand = `java ${fileName}`;
    } else if (language === "python") {
      fileExtension = "py";
      fileName = "main";
      fs.writeFileSync(
        path.join(__dirname, `${fileName}.${fileExtension}`),
        code
      );
      // Directly run Python code (assuming python3 is available)
      runCommand = `python3 ${fileName}.${fileExtension}`;
    } else if (
      language === "c_cpp" ||
      language === "c++" ||
      language === "cpp"
    ) {
      fileExtension = "cpp";
      fileName = "main";
      fs.writeFileSync(
        path.join(__dirname, `${fileName}.${fileExtension}`),
        code
      );
      compileCommand = `g++ ${fileName}.${fileExtension} -o ${fileName}`;
      runCommand = `./${fileName}`;
    } else {
      return reject(new Error("Unsupported language."));
    }

    // Function to run the command and pass inputData if needed.
    const runCommandWithInput = (cmd) => {
      // Note: For more advanced cases, you may want to spawn a process and write to its stdin.
      exec(cmd, { input: inputData }, (err, stdout, stderr) => {
        if (err) {
          return reject(new Error(stderr || stdout));
        }
        resolve(stdout);
      });
    };

    // If a compile step is required, run it first.
    if (compileCommand) {
      exec(compileCommand, (err, stdout, stderr) => {
        if (err) {
          return reject(new Error(stderr || stdout));
        }
        // Compilation successful; now run the code.
        runCommandWithInput(runCommand);
      });
    } else {
      // No compile step required (Python).
      runCommandWithInput(runCommand);
    }
  });
}

// Updated API endpoint
app.post("/api/execute", async (req, res) => {
  try {
    const { language, code, inputData } = req.body;
    console.log("Received request to execute code");
    console.log("Language:", language);
    console.log("Code:", code);
    console.log("Input Data:", inputData);

    if (!language || !code) {
      return res.status(400).json({ error: "Language and code are required" });
    }

    // Use a default newline if inputData is empty.
    const safeInput = inputData && inputData.trim() !== "" ? inputData : "\n";

    const output = await executeCode(language, code, safeInput);
    res.json({ output });
  } catch (error) {
    console.error("Execution Error:", error);
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

// Contact us api

app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Here you could add logic to store the message, send an email, etc.
  console.log(`New message from ${name} <${email}>`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${message}`);

  res.status(200).json({
    success: true,
    message: "Message received successfully",
  });
});

// Routes
import userRoutes from "./src/routes/user.routes.js";
import dsaProblemRoutes from "./src/routes/dsaproblem.routes.js";
import categoryRoutes from "./src/routes/category.routes.js";
import MockTestRoutes from "./src/routes/MockTest.routes.js";
import MockCategoryRoutes from "./src/routes/MockTestCategory.js";

app.use("/api/user", userRoutes);
app.use("/api/dsa", dsaProblemRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/mock-test", MockTestRoutes);
app.use("/api/mock-category", MockCategoryRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Study Platform API!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
