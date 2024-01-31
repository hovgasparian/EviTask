class CartController {
  async getAll(req, res) {
    try {
      const carts = await req.app.services.carts.getAll();
      res.status(201).json({
        status: "Success",
        message: carts,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  }

  async addProduct(req, res) {
    const body = req.body;
    try {
      const carts = await req.app.services.carts.addProduct(body);
      res.status(201).json({
        status: "Success",
        message: carts,
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
      const updatedItems = await req.app.services.carts.update(id, body);
      res.status(200).json({
        status: "Success",
        message: updatedItems,
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
      const cartItem = await req.app.services.carts.remove(id);
      res.status(201).json({
        status: "Success",
        message: cartItem,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  }
}

module.exports = CartController;
