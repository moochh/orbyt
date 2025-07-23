import { Request, Response } from 'express';
import {
  createSpace,
  deleteSpace,
  findSpace,
  getAllSpaces,
  getTasksInSpace,
  updateSpace,
} from '../services/spaces';
import { AuthenticatedRequest } from '../types/auth';
import { CreateSpaceData, UpdateSpaceData } from '../types/spaces';

export const create = async (req: Request<{}, {}, CreateSpaceData>, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const data = req.body;

  const space = await createSpace({ userId, data });

  res.status(201).json(space);
};

export const getAll = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;

  const spaces = await getAllSpaces(userId);

  res.status(200).json(spaces);
};

export const getById = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const spaceId = parseInt(req.params.spaceId);

  const space = await findSpace({ userId, spaceId });

  res.status(200).json(space);
};

export const update = async (req: Request<{}, {}, UpdateSpaceData>, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const data = req.body;

  const space = await updateSpace({
    userId,
    data,
  });

  res.status(200).json(space);
};

export const remove = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const spaceId = parseInt(req.params.spaceId);

  await deleteSpace({ userId, spaceId });

  res.status(204).send();
};

export const getTasks = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const spaceId = parseInt(req.params.spaceId);

  const tasks = await getTasksInSpace({ userId, spaceId });

  res.status(200).json(tasks);
};
