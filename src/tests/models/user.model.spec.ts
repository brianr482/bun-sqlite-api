import { describe, expect, it } from "bun:test";
import { UserFactory } from "../mocks/user.factory";
import { User } from "../../models/user.model";

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
      ])
    })
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
      },)
    })
  });
});