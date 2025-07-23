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

export const create = async (req: Request, res: Response) => {
  const { name, colorId, iconId, illustrationId, orderNumber } = req.body;
  const userId = (req as AuthenticatedRequest).userId;

  const space = await createSpace({ userId, name, colorId, iconId, illustrationId, orderNumber });

  res.status(201).json(space);
};

export const getAll = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;

  const spaces = await getAllSpaces(userId);

  res.status(200).json(spaces);
};

export const getById = async (req: Request, res: Response) => {
  const spaceId = parseInt(req.params.spaceId);
  const userId = (req as AuthenticatedRequest).userId;

  const space = await findSpace({ userId, spaceId });

  res.status(200).json(space);
};

export const update = async (req: Request, res: Response) => {
  const spaceId = parseInt(req.params.spaceId);
  const { name, colorId, iconId, illustrationId, orderNumber } = req.body;
  const userId = (req as AuthenticatedRequest).userId;

  const space = await updateSpace({
    userId,
    spaceId,
    name,
    colorId,
    iconId,
    illustrationId,
    orderNumber,
  });

  res.status(200).json(space);
};

export const remove = async (req: Request, res: Response) => {
  const spaceId = parseInt(req.params.spaceId);
  const userId = (req as AuthenticatedRequest).userId;

  await deleteSpace({ userId, spaceId });

  res.status(204).send();
};

export const getTasks = async (req: Request, res: Response) => {
  const spaceId = parseInt(req.params.spaceId);
  const userId = (req as AuthenticatedRequest).userId;

  const tasks = await getTasksInSpace({ userId, spaceId });

  res.status(200).json(tasks);
};
