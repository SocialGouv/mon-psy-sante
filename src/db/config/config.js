var dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    dialect: "postgres",
    url: process.env.POSTGRESQL_URL,
  },
  production: {
    dialect: process.env.POSTGRES_DB_DIALECT,
    logging: true,
    operatorsAliases: 0,
    url: process.env.SCALINGO_POSTGRESQL_URL,
  },
};
