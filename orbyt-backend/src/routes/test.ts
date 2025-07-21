import express from 'express';

import { validateBody } from '../middleware/validate-body';
import { getAllUsers } from '../controllers/test';

const router = express.Router();

router.get('/users', getAllUsers);

export default router;
