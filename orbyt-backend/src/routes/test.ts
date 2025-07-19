import express from 'express';
import { createUser, getAllUsers } from '../controllers/test';
import { validateBody } from '../middleware/validateBody';

const router = express.Router();

router.get('/users', getAllUsers);
router.post(
  '/users',
  validateBody(['emailAddress', 'password', 'firstName', 'lastName']),
  createUser
);

export default router;
