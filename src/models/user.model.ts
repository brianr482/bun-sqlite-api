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
}
