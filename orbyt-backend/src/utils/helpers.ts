import { BadRequestError } from '../errors';

export const validateUpdateData = (payload: Record<string, any>) => {
  if (Object.keys(payload).length === 0) {
    throw new BadRequestError('NO_FIELDS_TO_UPDATE');
  }
};
