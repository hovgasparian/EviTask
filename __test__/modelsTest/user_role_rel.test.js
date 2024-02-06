const User_role_rel = require("../../app/models/User_role_rel");
const sequelize = require("../../app/db/sql");

describe("User_role_rel model", () => {
  beforeEach(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should not allow null values for user_id and role_id", async () => {
    await expect(
      User_role_rel.create({
        user_id: null,
        role_id: null,
      })
    ).rejects.toThrow();
  });
});
