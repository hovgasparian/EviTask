const sequelize = require("../../app/db/sql");
const Product = require("../../app/models/Product");

describe("Product model", () => {
  beforeEach(async () => {
    await sequelize.sync();
  });
  

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should not allow null for values name, price and description", async () => {
    await expect(
      Product.create({
        name: null,
        price: null,
        description: null,
      })
    ).rejects.toThrow();
  });
});
