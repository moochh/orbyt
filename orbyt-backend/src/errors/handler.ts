import { NextFunction, Request, Response } from 'express';

import { AppError } from './classes';

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'Something went wrong.';

  res.status(status).json({ code, message });
};
