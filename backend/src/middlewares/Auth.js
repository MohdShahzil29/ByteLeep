import redisClient from "../config/redis.js";
import UserModel from "../models/user.models.js";
import JWT from "jsonwebtoken";

// User middelwares
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check if token is valid in Redis
    const cachedToken = await redisClient.get(`session:${decoded.id}`);
    if (!cachedToken || cachedToken !== token) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid session" });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user?._id || req.user?.id;
    console.log("User ID from token:", userId);
    if (!userId) {
      return res
        .status(401)
        .send({ success: false, message: "No user ID found in token" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found in database" });
    }

    console.log("User from database:", user);
    if (user?.role !== "admin") {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
    next();
  } catch (error) {
    console.error("Error in admin middleware:", error);
    res.status(401).send({
      success: false,
      message: "Error in admin middleware",
    });
  }
};
