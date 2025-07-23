import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { create, update, remove } from '../controllers/buckets';
import { requireFields } from '../middleware/require-fields';

const router = express.Router();
router.use(authenticate);

router.post('/', requireFields(['spaceId', 'name']), create);
router.patch('/', requireFields(['id']), update);
router.delete('/:bucketId', remove);

export default router;
