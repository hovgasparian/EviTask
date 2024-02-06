const roles = require("../../app/constants/roles");
const sequelize = require("../../app/db/sql");

describe("Roles Module", () => {
  beforeEach(async () => {
    await sequelize.sync();
  });
  afterAll(async () => {
    await sequelize.close();
  });
  test("Should exprot roles with expected values", async () => {
    expect(roles).toEqual({
      admin: "Admin",
      customer: "Customer",
      user: "User",
    });
  });
});
