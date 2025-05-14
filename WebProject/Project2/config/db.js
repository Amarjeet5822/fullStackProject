// db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

const databaseName = process.env.DB_NAME;
const databaseUser = process.env.DB_USER;
const databasePassword = process.env.DB_PASSWORD;
const databaseHost = process.env.DB_HOST;
const databaseDialect = process.env.DB_DIALECT;

const sequelize = new Sequelize(databaseName, databaseUser, databasePassword, {
  host: databaseHost,
  dialect: databaseDialect || "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Sequelize connected to MySQL"))
  .catch((err) => console.error("Sequelize connection error:", err));

module.exports = sequelize;
