import { Express, Router } from 'express';
import { Route } from '../types/globals';

import auth from './auth';
import account from './account';
import spaces from './spaces';
import tasks from './tasks';

import test from './test';

const routes: Route[] = [
  {
    name: 'auth',
    router: auth,
  },
  {
    name: 'account',
    router: account,
  },
  {
    name: 'spaces',
    router: spaces,
  },
  {
    name: 'tasks',
    router: tasks,
  },
  {
    name: 'test',
    router: test,
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
