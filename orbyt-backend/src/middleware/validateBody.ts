import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/globals';

export const validateBody = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missing = requiredFields.filter((field) => !req.body[field]);

    if (missing.length > 0) {
      const error: ApiError = {
        code: 'MissingFields',
        message: `Missing fields: ${missing.join(', ')}`,
      };

      return res.status(400).json(error);
    }
    next();
  };
};
