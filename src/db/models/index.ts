import { Sequelize } from "sequelize";

import config from "../../services/config";
import dsCursor from "./dsCursor";
import psychologist from "./psychologist";

const sequelize = new Sequelize(config.postgre.url, {
  define: {
    freezeTableName: true,
  },
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: config.postgre.logging ? console.log : false,
});

export const models = {
  DSCursor: dsCursor(sequelize),
  Psychologist: psychologist(sequelize),
};
