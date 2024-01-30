const { Router } = require("express");
const productRouter = Router();
const ProductController = require("../controllers/productController");
const controller = new ProductController();

productRouter.get("/", controller.getAll);
productRouter.post("/", controller.createProduct);
productRouter.patch("/:id", controller.update);
productRouter.delete("/:id", controller.remove);
module.exports = productRouter;
