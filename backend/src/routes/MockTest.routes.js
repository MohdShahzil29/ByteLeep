import express from 'express';
import { createTestController, deleteTest, getAllTests, getTestBySlug, isEnrolledTest, updateTest } from '../controller/MockTest.controller.js';
import { authenticateUser } from '../middlewares/Auth.js';

const router = express();

router.post('/create-test', createTestController)
router.get('/get-test/:slug', getTestBySlug);
router.get('/get-all-test', getAllTests);
router.delete('/delete-test/:id', deleteTest)
router.put('/update-test/:id', updateTest);
router.post('/enroll-test',authenticateUser, isEnrolledTest)



export default router