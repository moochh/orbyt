import { BAD_REQUEST_ERRORS, UNAUTHORIZED_ERRORS } from '../errors/messages';

export type UnauthorizedErrorCode = keyof typeof UNAUTHORIZED_ERRORS;
export type BadRequestErrorCode = keyof typeof BAD_REQUEST_ERRORS;
