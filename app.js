require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const sequelize = require("./app/db/sql");
const app = express();

const models = require("./app/models");
const services = require("./app/src/services");

const indexRouter = require("./app/src/routes/index");
const usersRouter = require("./app/src/routes/users");
const rolesRouter = require("./app/src/routes/roles");
const productsRouter = require("./app/src/routes/product");
const cartRouter = require("./app/src/routes/cart");
const roleSeed = require("./app/seeds/roleSeeds");

const middleware = async () => {
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");
  app.use(logger("dev"));
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
};

const routing = async () => {
  app.use("/", indexRouter);
  app.use("/users", usersRouter);
  app.use("/roles", rolesRouter);
  app.use("/products", productsRouter);
  app.use("/carts", cartRouter);
};

const runSeeds = () => {
  roleSeed();
};

const other = async () => {
  app.models = {
    users: models.usersModel,
    roles: models.rolesModel,
    userRoleRels: models.userRoleRelModel,
    products: models.productsModel,
    productsImages: models.productsImagesModel,
    carts: models.cartsModel,
  };
  app.services = {
    users: new services.usersService(app.models),
    roles: new services.rolesService(app.models),
    products: new services.productService(app.models),
    carts: new services.cartsService(app.models),
  };
};

const errorHandling = async () => {
  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
  });
};

const dbConnection = async () => {
  await sequelize
    .authenticate()
    .then(() => {
      console.log("Server is connected successfully !");
    })
    .catch((error) => {
      console.log(error);
    });
};

const test = async () => {
  (async () => {})();
};

const initApp = async () => {
  middleware();
  dbConnection();
  routing();
  other();
  errorHandling();
  runSeeds();
  test();
};

initApp();

module.exports = app;
