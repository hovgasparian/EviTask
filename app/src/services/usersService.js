const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserRoleRel = require("../../models/User_role_rel");
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

  async register(body) {
    const { firstName, email, password, role_id } = body;
    const hashpassword = await bcrypt.hash(password, 7);

    const role = await this.models.roles.findOne({ where: { id: role_id } });
    if (!role) throw new Error("Role not found");
    const createdUser = await this.models.users.create({
      firstName,
      email,
      password: hashpassword,
    });
    await this.models.userRoleRels.create({
      user_id: createdUser.id,
      role_id: role.id,
    });

    return createdUser;
  }

  async login(body) {
    const { firstName, email, password } = body;
    const user = await this.models.users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) throw new Error("User doesn't found");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Passwords doesn't match !");

    const token = jwt.sign({ email: user.email }, process.env.SECRET_WORD, {
      expiresIn: "2h",
    });
    return token;
  }
}

module.exports = UsersService;
