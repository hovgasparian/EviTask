const { Router } = require("express");
const cartRouter = Router();
const CartController = require("../controllers/cartController");
const controller = new CartController();

cartRouter.get("/", controller.getAll);
cartRouter.post("/", controller.addProduct);
cartRouter.patch("/update/:id", controller.update);
cartRouter.delete("/:id", controller.remove);

module.exports = cartRouter;
