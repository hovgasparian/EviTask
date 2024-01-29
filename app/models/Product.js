const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sql");

class Product extends Model {}

Product.init(
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Products",
    createdAt: false,
    updatedAt: false,
  }
);

Product.sync();

module.exports = Product;
