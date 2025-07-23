import { Express } from 'express';
import { Route } from '../types/globals';

import auth from './auth';
import account from './account';
import spaces from './spaces';
import buckets from './buckets';
import tasks from './tasks';
import tags from './tags';

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
    name: 'buckets',
    router: buckets,
  },
  {
    name: 'tasks',
    router: tasks,
  },
  {
    name: 'tags',
    router: tags,
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
