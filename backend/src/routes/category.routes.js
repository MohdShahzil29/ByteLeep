import express from "express";
import { authenticateUser, isAdmin } from "../middlewares/Auth.js";
import { createCategoryController } from "../controller/category.controller.js";

const app = express.Router();

app.post(
  "/create-category",
  authenticateUser,
  isAdmin,
  createCategoryController
);

export default app;
