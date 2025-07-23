import {
  BAD_REQUEST_ERRORS,
  FORBIDDEN_ERRORS,
  NOT_FOUND_ERRORS,
  UNAUTHORIZED_ERRORS,
} from './messages';
import {
  BadRequestErrorCode,
  ForbiddenErrorCode,
  NotFoundErrorCode,
  UnauthorizedErrorCode,
} from '../types/errors';

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(code: string, message: string, statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(code: BadRequestErrorCode, message?: string) {
    super(code, message ?? BAD_REQUEST_ERRORS[code], 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(code: UnauthorizedErrorCode) {
    super(code, UNAUTHORIZED_ERRORS[code], 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(code: ForbiddenErrorCode) {
    super(code, FORBIDDEN_ERRORS[code], 403);
  }
}

export class NotFoundError extends AppError {
  constructor(code: NotFoundErrorCode) {
    super(code, NOT_FOUND_ERRORS[code], 404);
  }
}

export class InternalServerError extends AppError {
  constructor(code: string = 'INTERNAL_SERVER_ERROR', message: string = 'Something went wrong.') {
    super(code, message, 500);
  }
}
