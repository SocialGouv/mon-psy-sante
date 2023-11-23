var dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    username: process.env.PGUSER || "monpsysante",
    password: process.env.PGPASSWORD || "monpsysante",
    database: process.env.PGDATABASE || "monpsysante",
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    dialect: "postgres",
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
    host: process.env.PGHOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
