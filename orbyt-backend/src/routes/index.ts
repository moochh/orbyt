import auth from './auth';
import tasks from './tasks';
import test from './test';
import { Express, Router } from 'express';

interface Route {
  name: string;
  router: Router;
}

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
];

export function registerRoutes(app: Express) {
  routes.forEach((route) => {
    app.use(`/api/${route.name}`, route.router);
  });
}
