const { Router } = require("express");
const rolesRouter = Router();
const RoleController = require("../controllers/roleController");
const controller = new RoleController();

rolesRouter.get("/", controller.getAllRoles);
rolesRouter.post(
  "/",
  (req, res, next) => {
    console.log(req.body);
    next();
  },
  controller.create
);

module.exports = rolesRouter;
