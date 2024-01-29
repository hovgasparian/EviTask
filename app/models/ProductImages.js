const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sql");

class ProductImages extends Model {}

ProductImages.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProductImages",
    createdAt: false,
    updatedAt: false,
  }
);

ProductImages.sync();

module.exports = ProductImages;
