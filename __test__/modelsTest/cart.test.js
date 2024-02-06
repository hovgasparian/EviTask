const sequelize = require("../../app/db/sql");
const Cart = require("../../app/models/Cart");

describe("Cart Model", () => {
  beforeEach(async () => {
    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("Should create a cart instance", async () => {
    const cart = await Cart.create({
      user_id: 42,
      product_id: 14,
    });

    expect(cart).toBeDefined();
  });

  it("Should not allow null values for user_id and product_id", async () => {
    await expect(
      Cart.create({
        user_id: null,
        product_id: null,
      })
    ).rejects.toThrow();
  });
});
