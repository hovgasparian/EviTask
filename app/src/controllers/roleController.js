class RoleController {
  async getAllRoles(req, res) {
    try {
      const roles = await req.app.services.roles.getAllRoles();
      res.status(201).json({
        status: "Success",
        message: roles,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
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
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  }
}

module.exports = RoleController;
