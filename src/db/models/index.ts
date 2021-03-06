import { Sequelize } from "sequelize";

import config from "../../services/config";
import psychologist from "./psychologist";

export const sequelize = new Sequelize(config.postgre.url, {
  define: {
    freezeTableName: true,
  },
  dialect: "postgres",
  logging: config.postgre.logging ? console.log : false,
});

export const models = {
  Psychologist: psychologist(sequelize),
};
