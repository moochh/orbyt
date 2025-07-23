import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors';
import { AuthenticatedRequest } from '../types/auth';

export const authenticate = (
  req: Request,
  res: Response<AuthenticatedRequest>,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedError('MISSING_TOKEN');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string };

    (req as AuthenticatedRequest).userId = parseInt(decoded.sub);
    next();
  } catch (err) {
    throw new UnauthorizedError('INVALID_TOKEN');
  }
};
