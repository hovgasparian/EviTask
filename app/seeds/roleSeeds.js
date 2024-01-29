const roles = require("../constants/roles");
const Role = require("../models/Role");

const roleSeed = async () => {
  const defaultRoles = Object.values(roles);
  await Promise.all(
    defaultRoles.map(async (role) => {
      const foundedRole = await Role.findOne({ where: { name: role } });
      if (!foundedRole) Role.create({ name: role });
    })
  );
};
module.exports = roleSeed;
