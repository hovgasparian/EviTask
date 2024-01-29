const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sql");

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "roles",
    createdAt: false,
    updatedAt: false,
  }
);

Role.sync();

module.exports = Role;
