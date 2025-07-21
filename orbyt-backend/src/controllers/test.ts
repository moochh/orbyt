import { Request, Response } from 'express';
import { getUsers } from '../services/test';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.status(200).json(users);
};
