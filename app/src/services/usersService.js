const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRoleRel = require("../../models/User_role_rel");
const User = require("../../models/User");
const Role = require("../../models/Role");

class UsersService {
  constructor(models) {
    this.models = models;
  }
  async getAll() {
    const result = await this.models.users.findAll({
      include: {
        model: UserRoleRel,
        as: "roles",
        include: [{ model: Role, as: "role" }],
      },
    });
    return result;
  }
  async getById(id) {
    const result = await this.models.users.findAll({
      where: {
        id: id,
      },
    });
    return result;
  }

  async createUser(body) {
    const { firstName, email, password, role_id } = body;
    const role = await this.models.roles.findOne({ where: { id: role_id } });
    if (!role) throw new Error("Role not found");
    const createdUser = await this.models.users.create({
      firstName,
      email,
      password,
    });
    await this.models.userRoleRels.create({
      user_id: createdUser.id,
      role_id: role.id,
    });
    return createdUser;
  }

  async remove(id) {
    const result = await this.models.users.destroy({ where: { id: id } });
    return result;
  }
}

module.exports = UsersService;
