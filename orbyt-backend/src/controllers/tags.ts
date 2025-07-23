import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import { CreateTagParams, UpdateTagParams } from '../types/tags';
import { createTag, deleteTag, updateTag } from '../services/tags';

export const create = async (
  req: Request<{}, {}, Omit<CreateTagParams, 'userId'>>,
  res: Response
) => {
  const createParams = req.body;
  const userId = (req as AuthenticatedRequest).userId;

  const tag = await createTag({
    userId,
    ...createParams,
  });

  res.status(201).json(tag);
};

export const update = async (
  req: Request<{}, {}, Omit<UpdateTagParams, 'userId'>>,
  res: Response
) => {
  const updateParams = req.body;
  const userId = (req as AuthenticatedRequest).userId;

  const tag = await updateTag({
    userId,
    ...updateParams,
  });

  res.status(200).json(tag);
};

export const remove = async (req: Request, res: Response) => {
  const tagId = parseInt(req.params.tagId);
  const userId = (req as AuthenticatedRequest).userId;

  await deleteTag({ userId, tagId });

  res.status(204).json();
};
