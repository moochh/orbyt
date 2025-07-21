import express from 'express';

import { getAllTasks, createTask } from '../controllers/tasks';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', createTask);

export default router;
