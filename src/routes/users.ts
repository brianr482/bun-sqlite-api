import Elysia from 'elysia';
import { UserController } from '../controllers/user.controller';

export const usersRoutes = new Elysia()
  .group('/users', app => app
    .get('/', UserController.getAllUsers)
  )