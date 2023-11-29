import Elysia, { t } from 'elysia';
import { UserController } from '../controllers/user.controller';

export const usersRoutes = new Elysia()
  .group('/users', app => app
    .post(
      '/',
      ( { body }) => UserController.create(body),
      {
        body: t.Object({
          name: t.String(),
          email: t.String(),
          address: t.String(),
          phone: t.Optional(t.String()),
          bio: t.Optional(t.String()),
        })
      },
    )
    .get('/', UserController.getAllUsers)
    .delete(
      '/:id',
      ( { params: { id } }) => UserController.deleteUserById(id),
      { params: t.Object({ id: t.Numeric() }) },
    )
    .get(
      '/:id',
      ( { params: { id } }) => UserController.getUserById(id),
      { params: t.Object({ id: t.Numeric() }) },
    )
    .put(
      '/:id',
      ( { params: { id }, body }) => UserController.updateUserById(id, body),
      {
        params: t.Object({ id: t.Numeric() }),
        body: t.Object({
          name: t.Optional(t.String()),
          address: t.Optional(t.String()),
          phone: t.Optional(t.String()),
          bio: t.Optional(t.String()),
        })
      },
    )
  );