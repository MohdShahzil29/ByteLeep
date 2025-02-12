import express from 'express';
import { createTestController, deleteTest, getAllTests, getProgress, getTestBySlug, getUserEnrolledTests, isEnrolledTest, saveProgress, searchTests, updateTest } from '../controller/MockTest.controller.js';
import { authenticateUser } from '../middlewares/Auth.js';


const router = express();

router.post('/create-test', createTestController)
router.get('/get-test/:slug', getTestBySlug);
router.get('/get-all-test', getAllTests);
router.delete('/delete-test/:id', deleteTest)
router.put('/update-test/:id', updateTest);
router.post('/enroll-test',authenticateUser, isEnrolledTest)
router.get('/search', searchTests)
router.get('/get-enrolled-tests', authenticateUser, getUserEnrolledTests)
router.post("/save-progress/:slug", authenticateUser, saveProgress);
router.get("/get-progress/:slug", authenticateUser, getProgress);



export default router