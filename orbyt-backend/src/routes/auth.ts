import express from 'express';
import { login } from '../controllers/auth';
import { validateBody } from '../middleware/validateBody';

const router = express.Router();

router.post('/login', validateBody(['emailAddress', 'password']), login);

export default router;
