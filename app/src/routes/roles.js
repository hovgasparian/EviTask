const { Router } = require("express");
const rolesRouter = Router();
const RoleController = require("../controllers/roleController");
const controller = new RoleController();

rolesRouter.get("/", controller.getAllRoles);
rolesRouter.post("/", controller.create);

module.exports = rolesRouter;
