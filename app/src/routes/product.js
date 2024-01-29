const { Router } = require("express");
const productRouter = Router();
const ProductController = require("../controllers/productController");
const controller = new ProductController();
const verify = require("../../../middleware/verify");
const upload = require("../../../multer/multer");

productRouter.get("/", controller.getAll);
productRouter.post("/", controller.createProduct);
productRouter.patch("/update/:id", controller.update);
productRouter.delete("/:id", controller.remove);
module.exports = productRouter;
