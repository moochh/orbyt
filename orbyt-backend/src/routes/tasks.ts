import express from 'express';

import { authenticate } from '../middleware/authenticate';
import { create, remove, update } from '../controllers/tasks';
import { requireFields } from '../middleware/require-fields';

const router = express.Router();
router.use(authenticate);

router.post('/', requireFields(['spaceId', 'title']), create);
router.patch('/', update);
router.delete('/:taskId', remove);

export default router;
