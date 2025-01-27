import express from "express";
import morgan from "morgan";
import dotnev from "dotenv";
import cors from "cors";
import { connectToDb } from "./src/config/db.js";
import redisClient from "./src/config/redis.js";
import cookieParser from "cookie-parser";


dotnev.config();
connectToDb();
// Check Redis connection status
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
import dsaProblemRoutes from './src/routes/dsaproblem.routes.js'

app.use("/api/user", userRoutes);
app.use('/api/dsa', dsaProblemRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to Study Platform API!");
});

// Start the server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
