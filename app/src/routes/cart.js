const { Router } = require("express");
const cartRouter = Router();
const CartController = require("../controllers/cartController");
const controller = new CartController();
const AuthMiddleware = require("../../../middleware/authMiddleware");
const RoleMiddleware = require("../../../middleware/roleMiddleware");
const roles = require('../../constants/roles')

cartRouter.get("/", AuthMiddleware, RoleMiddleware(roles.user,roles.admin,roles.customer), controller.getAll);
cartRouter.post("/", controller.addProduct);
cartRouter.patch("/:id", controller.update);
cartRouter.delete("/:id", controller.remove);

module.exports = cartRouter;
