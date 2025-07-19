import express from 'express';
import { createUser } from '../controllers/test';
import { validateBody } from '../middleware/validateBody';

const router = express.Router();

router.post(
  '/users',
  validateBody(['emailAddress', 'password', 'firstName', 'lastName']),
  createUser,
);

export default router;
