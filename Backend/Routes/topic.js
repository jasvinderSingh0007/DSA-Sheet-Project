import express from 'express';
import { verifyToken } from '../middleware/auth.js';
const router = express.Router();
import { getAllTopics } from '../controller/topic.js';
import { markProblemAsCompleted } from '../controller/user.js'

router.get('/', verifyToken, getAllTopics);
router.post('/mark', verifyToken, markProblemAsCompleted);

export default router;