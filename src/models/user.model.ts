import { InternalServerError, NotFoundError } from 'elysia';
import db from '../../db/db';

export interface User {
  id: number;
  name: String;
  email: String;
  address: String;
  phone?: String;
  bio?: String;
}

export interface CreateUserDB {
  $name: String;
  $email: String;
  $address: String;
  $phone?: String;
  $bio?: String;
}

export class User {
  public static getAll(): User[] {
    return db.query<User, null>('SELECT * FROM user').all(null);
  }

  public static getById(userId: number): User | null {
    return db.query<User, number>('SELECT * FROM user WHERE id = ?').get(userId);
  }

  public static deleteById(userId: number): void | never {
    if (!this.getById(userId)) {
      throw new NotFoundError(`User does not exist`)
    }

    const result: number | null = db.query<number, number>('DELETE FROM user WHERE id = ? RETURNING *')
      .get(userId);

    if (!result || result === 0) {
      throw new InternalServerError('User was not deleted successfully.')
    }

    return;
  }
}
