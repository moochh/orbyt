import { Request, Response, NextFunction } from 'express';

import { BadRequestError } from '../errors';

export const validateBody = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missing = requiredFields.filter((field) => !req.body[field]);

    if (missing.length > 0) {
      const errorMessage = `Missing fields: ${missing.join(', ')}`;
      throw new BadRequestError('MISSING_FIELDS', errorMessage);
    }

    next();
  };
};
