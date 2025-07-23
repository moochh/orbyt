import express, { RequestHandler } from 'express';
import { create, getAll, getById, getTasks, remove, update } from '../controllers/spaces';
import { authenticate } from '../middleware/authenticate';
import { requireFields } from '../middleware/require-fields';
import { AuthenticatedRequest } from '../types/auth';

const router = express.Router();
router.use(authenticate);

router.post('/', requireFields(['name']), create);
router.get('/', getAll);
router.get('/:spaceId', getById);
router.put('/:spaceId', update);
router.delete('/:spaceId', remove);
router.get('/:spaceId/tasks', getTasks);

export default router;
