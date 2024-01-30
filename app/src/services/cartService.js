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
    await this.models.carts.update({ user_id, product_id }, { where: { id } });
    return this.models.carts.findOne({where:{id}})
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
