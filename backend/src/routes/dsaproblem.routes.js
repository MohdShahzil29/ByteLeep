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
} from "../controller/dsaProblem.controller.js";
import { isAdmin, authenticateUser } from "../middlewares/Auth.js";

const router = express.Router();

// Validation middleware
const problemValidation = [
  body("title").isString().notEmpty(),
  body("difficulty").isIn(["Easy", "Medium", "Hard"]),
  body("accuracy").isInt({ min: 0, max: 100 }),
  body("points").isInt(),
  body("description").isString().notEmpty(),
  body("input").isArray().notEmpty(),
  body("output").isArray().notEmpty(),
  body("shortExplanation").isString().notEmpty(),
  body("constraints").isString().notEmpty(),
  body("companyTags").isArray().notEmpty(),
  body("topicTags").isArray().notEmpty(),
  body("category").isString().notEmpty(),
];

router.post(
  "/create",
  // authenticateUser,
  // isAdmin,
  problemValidation,
  createProblem
);
router.get("/get-problem/:slug", getOneProblemBySlug);
router.get("/", getAllProblems);
router.put(
  "/update/:id",
  authenticateUser,
  isAdmin,
  problemValidation,
  updateProblem
);
router.delete("/delete/:id", deleteProblem);
router.get("/get-input/:slug", getProblemInputBySlug);
router.post("/submit", submitSolution);

export default router;
