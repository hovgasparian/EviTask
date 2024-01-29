const { Errors, ErrorMessages } = require("../../../errors/errors");

class UserController {
  async getAll(req, res) {
    try {
      const users = await req.app.services.users.getAll();
      res.status(201).json({
        status: "Success",
        message: users,
      });
    } catch (error) {
      Errors.notFound(res, ErrorMessages.NOT_FOUND);
    }
  }

  async getById(req, res) {
    const id = req.params.id;
    try {
      const user = await req.app.services.users.getById(id);
      res.status(201).json({
        status: "Success",
        message: user,
      });
    } catch (error) {
      Errors.notFound(res, ErrorMessages.NOT_FOUND);
    }
  }

  async createUser(req, res) {
    const body = req.body;
    try {
      const user = await req.app.services.users.createUser(body);
      res.status(201).json({
        status: "Success",
        message: user,
      });
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  }
  async remove(req, res) {
    const id = req.params.id;
    try {
      const user = await req.app.services.users.remove(id);
      res.status(201).json({
        status: "Success",
        message: user,
      });
    } catch (error) {
      Errors.wrongStep(res, ErrorMessages.WRONG_STEP);
    }
  }
}

module.exports = UserController;
