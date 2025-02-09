import express from "express";
import { authenticateUser, isAdmin } from "../middlewares/Auth.js";
import {
  createCategoryController,
  deleteCategoryController,
  filterDsaProblemsController,
  getAllCategoryController,
  getDsaProblemsByCategoryController,
} from "../controller/category.controller.js";
import { getOneProblemBySlug } from "../controller/dsaProblem.controller.js";

const app = express.Router();

app.post(
  "/create-category",
  createCategoryController
);
app.get("/get-all-categories", getAllCategoryController);
app.get("/get-categorybyslug/:slug", getOneProblemBySlug);
app.delete("/delete-category/:id", deleteCategoryController);
app.get("/problems/:slug", getDsaProblemsByCategoryController);
app.get('/filter', filterDsaProblemsController);

export default app;
