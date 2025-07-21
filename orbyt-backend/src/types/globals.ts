import { Router } from 'express';

export interface ApiError {
  code: string;
  message: string;
}

export interface Route {
  name: string;
  router: Router;
}
