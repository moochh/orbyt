import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import { UpdateTagData } from '../types/tags';
import { deleteTag, updateTag } from '../services/tags';

export const update = async (req: Request<{}, {}, UpdateTagData>, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const data = req.body;

  const tag = await updateTag({
    userId,
    data,
  });

  res.status(200).json(tag);
};

export const remove = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const tagId = parseInt(req.params.tagId);

  await deleteTag({ userId, tagId });

  res.status(204).json();
};
