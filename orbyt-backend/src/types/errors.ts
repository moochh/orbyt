import {
  BAD_REQUEST_ERRORS,
  FORBIDDEN_ERRORS,
  NOT_FOUND_ERRORS,
  UNAUTHORIZED_ERRORS,
} from '../errors';

export type UnauthorizedErrorCode = keyof typeof UNAUTHORIZED_ERRORS;
export type BadRequestErrorCode = keyof typeof BAD_REQUEST_ERRORS;
export type ForbiddenErrorCode = keyof typeof FORBIDDEN_ERRORS;
export type NotFoundErrorCode = keyof typeof NOT_FOUND_ERRORS;
