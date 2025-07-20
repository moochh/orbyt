import fs from 'fs';
import path from 'path';

const routesDir = __dirname;
const routeFiles = fs
  .readdirSync(routesDir)
  .filter((file) => file !== 'index.ts' && file.endsWith('.ts'));

export const routes = routeFiles.map((file) => {
  const name = path.parse(file).name;
  const router = require(path.join(routesDir, file)).default;
  return {
    name,
    router,
  };
});
