import express from 'express';
import { authenticate } from '../middleware/authenticate';
import { update, remove } from '../controllers/tags';
import { requireFields } from '../middleware/require-fields';

const router = express.Router();
router.use(authenticate);

router.patch('/', requireFields(['id']), update);
router.delete('/:tagId', remove);

export default router;
