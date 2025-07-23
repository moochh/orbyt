import express from 'express';

import { authenticate } from '../middleware/authenticate';
import { getAccountDetails } from '../controllers/account';

const router = express.Router();
router.use(authenticate);

router.get('/', authenticate, getAccountDetails);

export default router;
