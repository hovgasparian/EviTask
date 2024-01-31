class ProductController {
  async getAll(req, res) {
    try {
      const products = await req.app.services.products.getAll();
      res.status(201).json({
        status: "Success",
        message: products,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  }
  async createProduct(req, res) {
    const body = req.body;
    try {
      const product = await req.app.services.products.createProduct(body);
      res.status(201).json({
        status: "Success",
        message: product,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    try {
      const updatedProduct = await req.app.services.products.update(id, body);
      res.status(202).json({
        status: "Success",
        message: updatedProduct,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  }

  async remove(req, res) {
    const { id } = req.params;
    try {
      const remUser = await req.app.services.products.remove(id);
      res.status(201).json({
        status: "Success",
        message: remUser,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  }
}

module.exports = ProductController;
