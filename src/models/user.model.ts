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

export interface CreateUserData {
  name: String;
  email: String;
  address: String;
  phone?: String;
  bio?: String;
}

export interface UpdateUserDB {
  $name?: String;
  $address?: String;
  $phone?: String;
  $bio?: String;
}

export interface UpdateUserData {
  name?: String;
  address?: String;
  phone?: String;
  bio?: String;
}

export class User {
  public static getAll(): User[] {
    return db.query<User, null>('SELECT * FROM user ORDER BY id ASC').all(null);
  }

  public static getById(userId: number): User | never {
    const result: User | null = db.query<User, number>('SELECT * FROM user WHERE id = ?').get(userId);
    if (!result) {
      throw new NotFoundError(`User does not exist`);
    }

    return result;
  }

  public static deleteById(userId: number): void | never {
    this.getById(userId);

    const result: User | null = db.query<User, number>('DELETE FROM user WHERE id = ? RETURNING *')
      .get(userId);

    console.log('result', result);

    if (!result) {
      throw new InternalServerError('User was not deleted successfully.')
    }

    return;
  }

  public static updateById(userId: number, updateData: UpdateUserData): User | null | never {
    const user: User = this.getById(userId);
    const updateObj: UpdateUserDB & { $id: number } = {
      $name: updateData.name ?? user.name,
      $address: updateData.address ?? user.address,
      $phone: updateData.phone ?? user.phone,
      $bio: updateData.bio ?? user.bio,
      $id: userId,
    };

    const result: User | null = db.query<User, Record<string, string | number>>(`UPDATE user 
      SET name = $name, address = $address, bio = $bio, phone = $phone
      WHERE id = $id
      RETURNING *`
    ).get(updateObj as unknown as Record<string, string | number>);

    if (!result) {
      throw new InternalServerError('User was not updated successfully.');
    }

    return result;
  }

  public static create(createData: CreateUserData): User | null | never {
    const createObj: CreateUserDB = {
      $name: createData.name,
      $email: createData.email,
      $address: createData.address,
      $phone: createData.phone,
      $bio: createData.bio,
    };

    const result: User | null = db.query<User, Record<string, string>>(`INSERT INTO user
      (name, email, address, phone, bio)
      VALUES ($name, $email, $address, $phone, $bio)
      RETURNING *`
    ).get(createObj as unknown as Record<string, string>);

    if (!result) {
      throw new InternalServerError('User was not created successfully.');
    }

    return result;
  }
}
