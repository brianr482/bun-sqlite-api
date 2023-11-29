import { NotFoundError } from "elysia";
import { describe, expect, it } from "bun:test";
import { UserFactory } from "../mocks/user.factory";
import { CreateUserData, UpdateUserData, User } from "../../models/user.model";
import db from "../../../db/db";

describe('UserModel', () => {
  describe('#getAll', () => {
    it('should return all users sorted by ID', () => {
      const mockUserA: User = UserFactory.create();
      const mockUserB: User = UserFactory.create();

      expect(User.getAll()).toEqual([
        {
          id: expect.anything() as any,
          name: mockUserA.name,
          email: mockUserA.email,
          address: mockUserA.address,
          phone: mockUserA.phone,
          bio: mockUserA.bio,
        },
        {
          id: expect.anything() as any,
          name: mockUserB.name,
          email: mockUserB.email,
          address: mockUserB.address,
          phone: mockUserB.phone,
          bio: mockUserB.bio,
        },
      ]);
    });
  });

  describe('#getById', () => {
    it('should return the user\'s record whose id matches the given id', () => {
      const mockUserA: User = UserFactory.create();

      expect(User.getById(mockUserA.id)).toEqual({
        id: expect.anything() as any,
        name: mockUserA.name,
        email: mockUserA.email,
        address: mockUserA.address,
        phone: mockUserA.phone,
        bio: mockUserA.bio,
      });
    });

    it('should return an error if no user\'s records match the given id', () => {
      expect(() => User.getById(-1)).toThrow(new NotFoundError('User does not exist'));
    });
  });

  describe('#deleteById', () => {
    it('should delete the user\'s record whose id matches the given id', () => {
      const mockUser: User = UserFactory.create();

      User.deleteById(mockUser.id);

      const userRecord: User | null = db.query<User, number>('SELECT * FROM user WHERE id = ?')
        .get(mockUser.id);

      expect(userRecord).toBeNull();
    });

    it('should return an error if no user\'s records match the given id of user to be deleted', () => {
      expect(() => User.deleteById(-1)).toThrow(new NotFoundError('User does not exist'));
    });
  });

  describe('#updateById', () => {
    it('should update the user\'s record whose id matches the given id with the given data', () => {
      const mockUser: User = UserFactory.create();

      const updateData: UpdateUserData = { name: 'updated name' };
      User.updateById(mockUser.id, updateData);

      const userRecord: User = db.query<User, number>('SELECT * FROM user WHERE id = ?')
        .get(mockUser.id) as User;

      expect(userRecord.name).toEqual(updateData.name as string);
    });

    it('should return an error if no user\'s records match the given id of user to be updated', () => {
      expect(() => User.updateById(-1, {})).toThrow(new NotFoundError('User does not exist'));
    });
  });

  describe('#create', () => {
    it('should create the a new user record', () => {
      const mockUserData: CreateUserData = UserFactory.mockUser();

      const userResult: User = User.create(mockUserData) as User;

      const userRecord: User = db.query<User, number>('SELECT * FROM user WHERE id = ?')
        .get(userResult.id) as User;

      expect(userRecord).toEqual({
        id: expect.anything() as any,
        name: mockUserData.name,
        email: mockUserData.email,
        address: mockUserData.address,
        phone: mockUserData.phone,
        bio: mockUserData.bio,
      });
    });
  });
});