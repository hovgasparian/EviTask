const CartService = require("../../../app/src/services/cartService");

describe("CartService", () => {
  let mockModels;
  let cartService;

  beforeEach(() => {
    mockModels = {
      carts: {
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findOne: jest.fn(),
        destroy: jest.fn(),
      },
    };

    cartService = new CartService(mockModels);
  });

  describe("getAll", () => {
    it("should return all cart items", async () => {
      const mockCartItems = [{ id: 1, user_id: 1, product_id: 1 }];

      mockModels.carts.findAll.mockResolvedValueOnce(mockCartItems);

      const result = await cartService.getAll();

      expect(result).toEqual(mockCartItems);
      expect(mockModels.carts.findAll).toHaveBeenCalledWith({});
    });
  });

  describe("addProduct", () => {
    it("should add a product to the cart and return the cart item", async () => {
      const mockBody = { user_id: 1, product_id: 2 };
      const mockUser = { id: 1, name: "User_7" };
      const mockProduct = { id: 2, name: "Product 7" };
      const mockCartItem = { id: 1, user_id: 1, product_id: 2 };

      mockModels.carts.findAll
        .mockResolvedValueOnce([mockUser])
        .mockResolvedValueOnce([mockProduct]);
      mockModels.carts.create.mockResolvedValueOnce(mockCartItem);

      const result = await cartService.addProduct(mockBody);

      expect(result).toEqual(mockCartItem);
      expect(mockModels.carts.findAll).toHaveBeenCalledWith({
        where: { id: mockBody.user_id },
      });
      expect(mockModels.carts.findAll).toHaveBeenCalledWith({
        where: { id: mockBody.product_id },
      });
      expect(mockModels.carts.create).toHaveBeenCalledWith({
        user_id: mockBody.user_id,
        product_id: mockBody.product_id,
      });
    });

    it("should throw an error if user or product not found", async () => {
      const mockBody = { user_id: 1, product_id: 2 };

      mockModels.carts.findAll
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce([]);

      await expect(cartService.addProduct(mockBody)).rejects.toThrow(
        "User or Product not found"
      );
    });
  });

  describe("update", () => {
    it("should update a cart item and return the updated cart item", async () => {
      const mockId = 1;
      const mockBody = { user_id: 2, product_id: 3 };
      const mockUpdatedCartItem = { id: 1, user_id: 2, product_id: 3 };

      mockModels.carts.update.mockResolvedValueOnce(); 
      mockModels.carts.findOne.mockResolvedValueOnce(mockUpdatedCartItem); 

      const result = await cartService.update(mockId, mockBody);

      expect(result).toEqual(mockUpdatedCartItem);
      expect(mockModels.carts.update).toHaveBeenCalledWith(
        { user_id: mockBody.user_id, product_id: mockBody.product_id },
        { where: { id: mockId } }
      );
      expect(mockModels.carts.findOne).toHaveBeenCalledWith({
        where: { id: mockId },
      });
    });

    it("should throw an error if the cart item is not found", async () => {
      const mockId = 1;
      const mockBody = { user_id: 2, product_id: 3 };

      mockModels.carts.update.mockRejectedValueOnce(
        new Error("Cart item not found")
      );

      await expect(cartService.update(mockId, mockBody)).rejects.toThrow(
        "Cart item not found"
      );
    });
  });

  describe("remove", () => {
    it("should remove a cart item and return the number of deleted items", async () => {
      const mockId = 1;
      const mockDeletedCount = 1;

      mockModels.carts.destroy.mockResolvedValueOnce(mockDeletedCount);

      const result = await cartService.remove(mockId);

      expect(result).toEqual(mockDeletedCount);
      expect(mockModels.carts.destroy).toHaveBeenCalledWith({
        where: { id: mockId },
      });
    });

    it("should throw an error if the cart item is not found", async () => {
      const mockId = 1;

      mockModels.carts.destroy.mockRejectedValueOnce(
        new Error("Cart item not found")
      );

      await expect(cartService.remove(mockId)).rejects.toThrow(
        "Cart item not found"
      );
    });
  });
});
