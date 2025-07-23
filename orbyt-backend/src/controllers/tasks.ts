import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import { createTask, updateTask, deleteTask } from '../services/tasks';
import { CreateTaskData, UpdateTaskData } from '../types/tasks';

export const create = async (req: Request<{}, {}, CreateTaskData>, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const data = req.body;

  const task = await createTask({
    userId,
    data,
  });

  res.status(201).json(task);
};

export const update = async (req: Request<{}, {}, UpdateTaskData>, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const data = req.body;

  const task = await updateTask({
    userId,
    data,
  });

  res.status(200).json(task);
};

export const remove = async (req: Request, res: Response) => {
  const userId = (req as AuthenticatedRequest).userId;
  const taskId = parseInt(req.params.taskId);

  await deleteTask({ userId, taskId });

  res.status(204).json();
};
