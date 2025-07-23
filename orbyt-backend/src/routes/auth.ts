import express from 'express';

import { requireFields } from '../middleware/require-fields';
import { login, signup } from '../controllers/auth';

const router = express.Router();

router.post('/login', requireFields(['emailAddress', 'password']), login);
router.post(
  '/signup',
  requireFields(['emailAddress', 'password', 'firstName', 'lastName']),
  signup
);

export default router;
