const { Errors, ErrorMessages } = require("../../../errors/errors");

class RoleController {
  async getAllRoles(req, res) {
    try {
      const roles = await req.app.services.roles.getAllRoles();
      res.status(201).json({
        status: "Success",
        message: roles,
      });
    } catch (error) {
      Errors.notFound(res, ErrorMessages.NOT_FOUND);
    }
  }
  async create(req, res) {
    const { body: createRole } = req;
    console.log(req.app.services);
    try {
      const role = await req.app.services.roles.create(createRole);
      res.status(201).json({
        status: "Success",
        message: role,
      });
    } catch (error) {
      Errors.wrongStep(res, ErrorMessages.WRONG_STEP);
    }
  }
}

module.exports = RoleController;
