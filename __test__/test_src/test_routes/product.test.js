const { Router } = require("express");
const ProductController = require("../../../app/src/controllers/productController");
const AuthMiddleware = require("../../../middleware/authMiddleware");

jest.mock("express", () => ({
  Router: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  })),
}));

jest.mock("../../../app/src/controllers/productController", () => ({
  getAll: jest.fn(),
  createProduct: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

jest.mock("../../../middleware/authMiddleware", () => jest.fn());

describe("productRouter", () => {
  it("should setup routes with correct middleware and controller functions", () => {
    // Call the router setup
    require("../../../app/src/routes/product");

    // Assertions
    expect(Router).toHaveBeenCalled();

    // Mock router instance
    const routerInstance = Router.mock.results[0].value;

    // Verify route configurations
    expect(routerInstance.get).toHaveBeenCalledWith(
      "/",
      AuthMiddleware,
      ProductController.getAll
    );
    expect(routerInstance.post).toHaveBeenCalledWith(
      "/",
      AuthMiddleware,
      ProductController.createProduct
    );
    expect(routerInstance.patch).toHaveBeenCalledWith(
      "/:id",
      AuthMiddleware,
      ProductController.update
    );
    expect(routerInstance.delete).toHaveBeenCalledWith(
      "/:id",
      AuthMiddleware,
      ProductController.remove
    );
  });
});
