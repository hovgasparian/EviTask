const RolesService = require("../../../app/src/services/rolesService");

describe("RolesService", () => {
  let rolesService;
  let mockRolesModel;

  beforeEach(() => {
    mockRolesModel = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    rolesService = new RolesService({ roles: mockRolesModel });
  });

  describe("getAllRoles", () => {
    it("should return all roles", async () => {
      const mockRoles = [
        { id: 1, name: "Admin" },
        { id: 2, name: "User" },
      ];
      mockRolesModel.findAll.mockResolvedValue(mockRoles);

      const result = await rolesService.getAllRoles();

      expect(result).toEqual(mockRoles);
      expect(mockRolesModel.findAll).toHaveBeenCalled();
    });
  });
});
