const { Router } = require("express");
const cartRouter = Router();
const CartController = require("../controllers/cartController");
const controller = new CartController();
const AuthMiddleware = require("../../../middleware/authMiddleware");
const RoleMiddleware = require("../../../middleware/roleMiddleware");
const roles = require('../../constants/roles')

cartRouter.get("/", AuthMiddleware, RoleMiddleware(roles.admin), controller.getAll);
cartRouter.post("/", AuthMiddleware, RoleMiddleware(roles.admin), controller.addProduct);
cartRouter.patch("/:id", AuthMiddleware, RoleMiddleware(roles.admin), controller.update);
cartRouter.delete("/:id",AuthMiddleware, RoleMiddleware(roles.admin), controller.remove);

module.exports = cartRouter;
