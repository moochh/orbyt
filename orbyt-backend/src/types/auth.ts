import { Request } from 'express';

export interface LoginParams {
  emailAddress: string;
  password: string;
}

export interface SignupParams {
  emailAddress: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthenticatedRequest extends Request {
  userId: number;
}
