import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { create, update, remove } from '../controllers/buckets';

const router = express.Router();
router.use(authenticate);

router.post('/', create);
router.patch('/', update);
router.delete('/:bucketId', remove);

export default router;
