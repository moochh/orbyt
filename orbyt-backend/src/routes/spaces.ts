import express from 'express';
import { create, getAll, getById, remove, update } from '../controllers/spaces';
import { authenticate } from '../middleware/authenticate';
import { validateBody } from '../middleware/validate-body';

const router = express.Router();

router.post('/', authenticate, validateBody(['name']), create);
router.get('/', authenticate, getAll);
router.get('/:spaceId', authenticate, getById);
router.put('/:spaceId', authenticate, update);
router.delete('/:spaceId', authenticate, remove);

export default router;
