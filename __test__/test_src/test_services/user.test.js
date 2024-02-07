const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UsersService = require("../../../app/src/services/usersService");

describe("UsersService", () => {
  let usersService;
  let mockModels;

  beforeEach(() => {
    mockModels = {
      users: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
      },
      roles: {
        findOne: jest.fn(),
      },
      userRoleRels: {
        create: jest.fn(),
      },
    };

    usersService = new UsersService(mockModels);
  });

  describe("getAll", () => {
    it("should return all users with roles", async () => {
      const mockUsers = [
        {
          id: 1,
          firstName: "user",
          email: "user@gmail.com",
          roles: [{ id: 1, name: "Admin" }],
        },
      ];
      mockModels.users.findAll.mockResolvedValue(mockUsers);

      const result = await usersService.getAll();

      expect(result).toEqual(mockUsers);
      expect(mockModels.users.findAll).toHaveBeenCalled();
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const userData = {
        firstName: "user",
        email: "user@gmail.com",
        password: "password",
        role_id: 1,
      };
      const mockRole = { id: 1, name: "Admin" };
      const createdUser = { id: 1, ...userData };

      mockModels.roles.findOne.mockResolvedValue(mockRole);

      mockModels.users.create.mockResolvedValue(createdUser);

      const result = await usersService.createUser(userData);

      expect(result).toEqual(createdUser);
      expect(mockModels.roles.findOne).toHaveBeenCalledWith({
        where: { id: userData.role_id },
      });
      expect(mockModels.users.create).toHaveBeenCalledWith({
        firstName: userData.firstName,
        email: userData.email,
        password: userData.password,
      });
      expect(mockModels.userRoleRels.create).toHaveBeenCalledWith({
        user_id: createdUser.id,
        role_id: mockRole.id,
      });
    });
  });

  describe("remove", () => {
    it("should remove a user by id", async () => {
      const userId = 1;
      const mockResult = 1;
      mockModels.users.destroy.mockResolvedValue(mockResult);

      const result = await usersService.remove(userId);

      expect(result).toEqual(mockResult);
      expect(mockModels.users.destroy).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });
  });

  describe("register", () => {
    it("should register a new user", async () => {
      const userData = {
        firstName: "user",
        email: "user@gmail.com",
        password: "password",
        role_id: 1,
      };
      const mockRole = { id: 1, name: "Admin" };
      const createdUser = { id: 1, ...userData };

      mockModels.roles.findOne.mockResolvedValue(mockRole);

      mockModels.users.create.mockResolvedValue(createdUser);

      const result = await usersService.register(userData);

      expect(result).toEqual(createdUser);
      expect(mockModels.roles.findOne).toHaveBeenCalledWith({
        where: { id: userData.role_id },
      });
      expect(mockModels.users.create).toHaveBeenCalledWith({
        firstName: userData.firstName,
        email: userData.email,
        password: expect.any(String),
      });
      expect(mockModels.userRoleRels.create).toHaveBeenCalledWith({
        user_id: createdUser.id,
        role_id: mockRole.id,
      });
    });
  });

  describe("login", () => {
    it("should login a user", async () => {
      const userData = { email: "user@gmail.com", password: "password" };
      const mockUser = {
        id: 1,
        firstName: "user",
        email: "user@gmail.com",
        password: "hashed_password",
      };
      const mockToken = "token";

      mockModels.users.findOne.mockResolvedValue(mockUser);

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      jwt.sign = jest.fn().mockReturnValue(mockToken);

      const result = await usersService.login(userData);

      expect(result).toEqual(mockToken);
      expect(mockModels.users.findOne).toHaveBeenCalledWith({
        where: { email: userData.email },
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(
        userData.password,
        mockUser.password
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { email: mockUser.email },
        expect.any(String),
        { expiresIn: "2h" }
      );
    });

    it("should throw an error if user not found", async () => {
      const userData = { email: "user@gmail.com", password: "password" };

      mockModels.users.findOne.mockResolvedValue(null);

      await expect(usersService.login(userData)).rejects.toThrow(
        "User doesn't found"
      );
    });

    it("should throw an error if passwords don't match", async () => {
      const userData = { email: "user@gmail.com", password: "password" };
      const mockUser = {
        id: 1,
        firstName: "user",
        email: "user@gmail.com",
        password: "hashed_password",
      };

      mockModels.users.findOne.mockResolvedValue(mockUser);
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await expect(usersService.login(userData)).rejects.toThrow(
        "Passwords doesn't match !"
      );
    });
  });
});
