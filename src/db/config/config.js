var dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    dialect: "postgres",
    url: process.env.DATABASE_URL,
  },
  production: {
    dialect: "postgres",
    url: process.env.DATABASE_URL,
  },
};
