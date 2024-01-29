const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const controller = new UserController();
const verifiedUser = require("../../../middleware/verify");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", verifiedUser, controller.createUser);
router.delete("/:id", controller.remove);

module.exports = router;
