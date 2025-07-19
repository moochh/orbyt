import { Express } from 'express';
import fs from 'fs';
import path from 'path';

export default function registerRoutes(app: Express) {
  const routesDir = __dirname;

  fs.readdirSync(routesDir).forEach((file) => {
    if (file === 'index.ts' || file === 'index.js') return;

    const routePath = path.join(routesDir, file);
    const route = require(routePath);

    // Use file name (without extension) as the route base
    const routeName = '/' + path.parse(file).name;

    // Handle both ES modules (export default) and CommonJS (module.exports)
    app.use('/api' + routeName, route.default || route);
  });
}
