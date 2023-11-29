import { faker } from '@faker-js/faker';
import db from '../db';
import { CreateUserDB } from '../../src/models/user.model';

const FAKE_USERS_AMOUNT: number = 100;

/**
 * Populate the user db table with mock users.
 */
const mockUsers = () => {
  const mockUserFn = (): CreateUserDB => ({
    $name: faker.person.fullName(),
    $email: faker.internet.email(),
    $address: faker.location.streetAddress(),
    $phone: faker.phone.number(),
    $bio: faker.person.bio(),
  });

  const mockUsersToCreate: CreateUserDB[] = new Array(FAKE_USERS_AMOUNT)
    .fill(null)
    .map(mockUserFn);
  
  const query = db.prepare(
    `INSERT INTO user (name, email, address, phone, bio) VALUES ($name, $email, $address, $phone, $bio)`,
  );

  const transactionFn: CallableFunction = db.transaction((usersToInsert: any[]) => {
    usersToInsert.forEach((userToInsert: any) => query.run(userToInsert));

    return usersToInsert.length;
  })

  const insertedRecords: number = transactionFn(mockUsersToCreate);

  console.log(`✅ Database successfully seeded with ${insertedRecords} fake users.`);
};

// Clear table beforehand
db.query('DELETE FROM user').run();

// Seed the user table
mockUsers();

process.exit();