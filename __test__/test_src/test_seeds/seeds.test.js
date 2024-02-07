const roleSeed = require("../../../app/seeds/roleSeeds");
const Role = require("../../../app/models/Role");
const roles = require("../../../app/constants/roles");

jest.mock("../../../app/models/Role", () => ({
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe("roleSeed", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should seed roles if they don't exist in the database", async () => {
    const defaultRoles = Object.values(roles);

    await roleSeed();

    expect(Role.findOne).toHaveBeenCalledTimes(defaultRoles.length);
    expect(Role.create).toHaveBeenCalledTimes(defaultRoles.length);
  });
});
