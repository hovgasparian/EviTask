const { Router } = require("express");
const productRouter = Router();
const ProductController = require("../controllers/productController");
const controller = new ProductController();
const AuthMiddleware = require("../../../middleware/authMiddleware");
const RoleMiddleware = require("../../../middleware/roleMiddleware");
const roles = require("../../../app/constants/roles");

productRouter.get("/", AuthMiddleware, controller.getAll);
productRouter.post("/", AuthMiddleware, controller.createProduct);
productRouter.patch("/:id", AuthMiddleware, controller.update);
productRouter.delete("/:id", AuthMiddleware, controller.remove);

module.exports = productRouter;
