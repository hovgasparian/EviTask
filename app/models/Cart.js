const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sql");

class Cart extends Model {}

Cart.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "cart",
    createdAt: false,
    updatedAt: false,
  }
);

Cart.sync();

module.exports = Cart;
