const ProductImages = require("../../models/ProductImages");

class ProductService {
  constructor(models) {
    this.models = models;
  }

  async getAll() {
    const result = await this.models.products.findAll({
      include: {
        model: ProductImages,
        as: "image",
      },
    });
    return result;
  }

  async createProduct(body) {
    const { name, price, description, image } = body;

    const product = await this.models.products.create({
      name,
      price,
      description,
    });
    await this.models.productsImages.create({
      product_id: product.id,
      image,
    });

    return product;
  }

  async update(id, body) {
    const { name, price, description, image } = body;
    await this.models.products.update(
      { name, price, description, image },
      { where: { id } }
    );
    return this.models.products.findOne({ where: { id } });
  }

  async remove(id) {
    const result = await this.models.products.destroy({
      where: {
        id: id,
      },
    });
    return result;
  }
}

module.exports = ProductService;
