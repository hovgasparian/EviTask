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
        include: [
          { model: Role, as: "role" },
        ],
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
    const { firstName, email, password } = body;
    const hashPassword = await bcrypt.hash(password, 7);
    const user = new this.models.users({
      firstName: firstName,
      email: email,
      password: hashPassword,
    });
    await user.save();
    return user;
  }
  async login(body) {
    const { firstName, email, password } = body;
    const user = await this.models.users.findAll({
      where: {
        name: firstName,
      },
    });
    if (!user) {
      throw new Error("User doesn't found");
    } else {
      const isPasswordValid = bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Passwords doesn't match");
      }
      const token = jwt.sign({ email: user.email }, process.env.SECRET_WORD, {
        expiresIn: "59m",
      });
      return token;
    }
  }
}

module.exports = UsersService;
