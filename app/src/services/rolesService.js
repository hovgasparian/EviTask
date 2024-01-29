class RolesService {
  constructor(models) {
    this.models = models;
  }

  async getAllRoles() {
    const result = await this.models.roles.findAll({ nest: true, raw: true });
    return result;
  }

  async create(body) {
    const result = new this.models.roles(body);
    await result.save();
    return result;
  }
}

module.exports = RolesService;
