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

//   describe("create", () => {
//     it("should create a new role", async () => {

//         const roleData = { name: "Manager" };
//       const createdRole = { id: 3, ...roleData };

//       const mockRoleInstance = {
//         save: jest.fn().mockResolvedValue(createdRole),
//       };
//       const mockRoleConstructor = jest.fn().mockReturnValue(mockRoleInstance);

//       mockRolesModel.roles = mockRoleConstructor;

//       const result = await rolesService.create(roleData);

//       expect(result).toEqual(createdRole);
//       expect(mockRoleConstructor).toHaveBeenCalledWith(roleData);
//       expect(mockRoleInstance.save).toHaveBeenCalled();
//     });
//   });
});
