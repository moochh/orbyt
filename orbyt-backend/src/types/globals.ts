import { Router } from 'express';

export interface ApiError {
  code: string;
  message: string;
}

export interface Route {
  name: string;
  router: Router;
}

export interface ScopedParams<T> {
  userId: number;
  data: T;
}
