class UserController {
  async getAll(req, res) {
    try {
      const users = await req.app.services.users.getAll();
      res.status(201).json({
        status: "Success",
        message: users,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
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
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
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
      res.status(404).json({
        status: "Fail",
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
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  }

  async register(req, res) {
    const body = req.body;
    try {
      const user = await req.app.services.users.register(body);
      res.status(201).json({
        status: "Success",
        message: user,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  }

  async login(req, res) {
    const body = req.body;
    try {
      const token = await req.app.services.users.login(body);
      res.status(201).json({
        status: "Success",
        message: token,
      });
    } catch (error) {
      res.status(404).json({
        status: "Fail",
        message: error.message,
      });
    }
  }
}

module.exports = UserController;
