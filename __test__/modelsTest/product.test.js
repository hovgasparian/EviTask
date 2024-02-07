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
  it("should create a new product", async () => {
    const product = await Product.create({
      name: "Test Product",
      price: 100,
      description: "This is a test product",
    });

    expect(product).toBeDefined();
    expect(product.id).toBeDefined();
    expect(product.name).toBe("Test Product");
    expect(product.price).toBe(100);
    expect(product.description).toBe("This is a test product");
  });
});
