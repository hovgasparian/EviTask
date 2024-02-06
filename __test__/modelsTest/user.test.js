const sequelize = require("../../app/db/sql");
const User = require("../../app/models/User");

describe("User Model", () => {
  beforeEach(async () => {
    await User.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should not allow null values for firstname, email and password", async () => {
    await expect(
      User.create({
        firstName: null,
        email: null,
        password: null,
      })
    ).rejects.toThrow();
  });
});
