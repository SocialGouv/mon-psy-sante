var dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    dialect: "postgres",
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    dialect: "postgres",
    url: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
