import express from "express";
import { body } from "express-validator";
import {
  createProblem,
  getOneProblemBySlug,
  getAllProblems,
  updateProblem,
  deleteProblem,
  getProblemInputBySlug,
  submitSolution,
  getAllTopicTagsController,
  getDefficultyTags,
} from "../controller/dsaProblem.controller.js";
import { isAdmin, authenticateUser } from "../middlewares/Auth.js";

const router = express.Router();
router.post(
  "/create",
  createProblem
);
router.get("/get-problem/:slug", getOneProblemBySlug);
router.get("/", getAllProblems);
router.put(
  "/update/:id",
  authenticateUser,
  isAdmin,
  updateProblem
);
router.delete("/delete/:id", deleteProblem);
router.get("/get-input/:slug", getProblemInputBySlug);
router.get('/all-topic-tags', getAllTopicTagsController);
router.get('/get-defficulty', getDefficultyTags)
router.post("/submit", submitSolution);

export default router;
