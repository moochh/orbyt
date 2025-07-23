import express from 'express';

import { requireFields } from '../middleware/require-fields';
import { getAllUsers } from '../controllers/test';

const router = express.Router();

router.get('/users', getAllUsers);

export default router;
