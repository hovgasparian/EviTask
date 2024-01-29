const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sql");

class UserRoleRel extends Model {}

UserRoleRel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user_role_rel',
    createdAt: false,
    updatedAt: false,
}
);

UserRoleRel.sync();

module.exports = UserRoleRel;