import { User } from "../models/user.model";

export class UserController {
  public static getAllUsers(): User[] {
    return User.getAll();
  }
}
