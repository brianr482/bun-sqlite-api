import { faker } from "@faker-js/faker";
import { CreateUserData, User } from "../../models/user.model";
import db from "../../../db/db";

export class UserFactory {
  public static mockUser(mockWith: Partial<CreateUserData> = {}): CreateUserData {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      bio: faker.person.bio(),
      ...mockWith,
    }
  };

  public static create(mockWith: Partial<CreateUserData> = {}): User {
    const userData: CreateUserData = Object.fromEntries(
      Object.entries(this.mockUser(mockWith)).map(([key, value]) => ([`$${key}`, value]))
    ) as CreateUserData;

    const result: User | null = db.query<User, Record<string, string>>(`INSERT INTO user
      (name, email, address, phone, bio)
      VALUES ($name, $email, $address, $phone, $bio)
      RETURNING *`
    ).get(userData as unknown as Record<string, string>);

    if (!result) {
      throw new Error('Mock User was not created successfully.');
    }

    return result;
  }
}