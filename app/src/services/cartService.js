class CartService {
  constructor(models) {
    this.models = models;
  }

  async getAll() {
    const result = await this.models.carts.findAll({});
    return result;
  }

  async addProduct(body) {
    const { user_id, product_id } = body;

    const user = await this.models.carts.findAll({
      where: {
        id: user_id,
      },
    });
    const product = await this.models.carts.findAll({
      where: {
        id: product_id,
      },
    });
    if (!user || !product) throw new Error("User or Product not found");

    const cartItem = await this.models.carts.create({ user_id, product_id });
    return cartItem;
  }

  async update(id, body) {
    const { user_id, product_id } = body;
    const findCart = await this.models.carts.findAll({
      where: {
        id: id,
      },
    });
    if (!findCart) throw new Error("Cart doesn't found");

    const result = await findCart.update({
      user_id,
      product_id,
    });
    return result;
  }

  async remove(id) {
    const result = await this.models.carts.destroy({
      where: {
        id: id,
      },
    });
    return result;
  }
}

module.exports = CartService;
