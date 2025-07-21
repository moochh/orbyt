import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/auth';
import { getUser } from '../services/account';

export const getAccountDetails = async (req: Request, res: Response) => {
  const user = await getUser((req as AuthenticatedRequest).userId);

  res.status(200).json(user);
};
