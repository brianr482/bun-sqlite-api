
import { UpdateUserData, User } from '../models/user.model';

export class UserController {
  public static getAllUsers(): User[] {
    return User.getAll();
  }

  public static deleteUserById(userId: number): void {
    return User.deleteById(userId);
  }

  public static getUserById(userId: number): User | null | never {
    return User.getById(userId);
  }

  public static updateUserById(userId: number, body: UpdateUserData): User | null | never {
    return User.updateById(userId, body);
  }
}
