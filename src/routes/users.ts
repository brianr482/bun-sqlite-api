import Elysia, { t } from 'elysia';
import { UserController } from '../controllers/user.controller';

export const usersRoutes = new Elysia()
  .group('/users', app => app
    .get('/', UserController.getAllUsers)
    .delete(
      '/:id',
      ( { params: { id } }) => UserController.deleteUseById(id),
      { params: t.Object({ id: t.Numeric() }) },
    )
  );