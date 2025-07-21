import { Express, Router } from 'express';
import { Route } from '../types/globals';

import auth from './auth';
import tasks from './tasks';
import test from './test';
import account from './account';

const routes: Route[] = [
  {
    name: 'auth',
    router: auth,
  },
  {
    name: 'tasks',
    router: tasks,
  },
  {
    name: 'test',
    router: test,
  },
  {
    name: 'account',
    router: account,
  },
];

export function registerRoutes(app: Express) {
  app.get('/', (_req, res) => {
    res.send('🚀 API is running...');
  });

  routes.forEach((route) => {
    app.use(`/api/${route.name}`, route.router);
  });
}
