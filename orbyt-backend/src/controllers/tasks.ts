import { Request, Response } from 'express';

export const getAllTasks = (req: Request, res: Response) => {
  res.json([{ id: 1, title: 'Example task' }]);
};

export const createTask = (req: Request, res: Response) => {
  const { title } = req.body;
  res.status(201).json({ message: 'Task created', title });
};
