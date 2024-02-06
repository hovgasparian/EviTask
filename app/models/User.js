const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sql");
const UserRoleRel = require("./User_role_rel");
const Role = require("./Role");
const Product = require("./Product");
const ProductImages = require("./ProductImages");
const Cart = require("../models/Cart");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "users",
    createdAt: false,
    updatedAt: false,
  }
);

User.sync();

User.hasMany(UserRoleRel, {
  foreignKey: "user_id",
  sourceKey: "id",
  as: "roles",
});
UserRoleRel.hasOne(User, {
  foreignKey: "id",
  sourceKey: "user_id",
  as: "user",
});
UserRoleRel.hasOne(Role, {
  foreignKey: "id",
  sourceKey: "role_id",
  as: "role",
});

Product.hasMany(ProductImages, {
  foreignKey: "product_id",
  as: "image",
  sourceKey: "id",
});
ProductImages.belongsTo(Product, {
  foreignKey: "id",
  as: "product",
  sourceKey: "product_id",
});

User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

Product.hasMany(Cart, { foreignKey: "product_id" });
Cart.belongsTo(Product, { foreignKey: "product_id" });

module.exports = User;
