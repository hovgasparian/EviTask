const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const controller = new UserController();


router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.createUser);
router.post("/register", controller.register);
router.post("/login", controller.login);
router.delete("/:id", controller.remove);

module.exports = router;
