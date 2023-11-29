import { Elysia } from 'elysia';
import { usersRoutes } from './routes/users';

const app = new Elysia()
  .group('/api/v1', app => app
    .use(usersRoutes))
  .listen(3000);

console.log(`🚀 Sever is running at ${app.server?.hostname}:${app.server?.port}`);
