const sequelize = require("../../app/db/sql");
const ProductImage = require("../../app/models/ProductImages");

describe("Product image model", () => {
  beforeEach(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should not allow null values for image & product_id", async () => {
    await expect(
      ProductImage.create({
        image: null,
        product_id: null,
      })
    ).rejects.toThrow();
  });
});
