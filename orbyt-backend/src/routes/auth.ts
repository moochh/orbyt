import express from 'express';

import { validateBody } from '../middleware/validate-body';
import { login, signup } from '../controllers/auth';

const router = express.Router();

router.post('/login', validateBody(['emailAddress', 'password']), login);
router.post('/signup', validateBody(['emailAddress', 'password', 'firstName', 'lastName']), signup);

export default router;
