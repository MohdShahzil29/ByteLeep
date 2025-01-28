import express from 'express';
import { compileCode } from '../controller/compiler.controller.js';

const router = express.Router();

// Route to compile code and generate test cases
router.post('/compile', compileCode);

export default router;
