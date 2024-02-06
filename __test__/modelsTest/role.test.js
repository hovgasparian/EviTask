const sequelize = require("../../app/db/sql");
const Role = require("../../app/models/Role");

describe("Role model", () => {
  beforeEach(async () => {
    await sequelize.sync();
  });
  afterAll(async () => {
    await sequelize.close();
  });

  it("Should not allow null values for name", async () => {
    await expect(
      Role.create({
        name: null,
      })
    ).rejects.toThrow();
  });
});
