import { Sequelize } from "sequelize";

import config from "../../services/config";
import dbConfig from "../config/config";
import psychologist from "./psychologist";

const env = process.env.NODE_ENV || "development";
const currentDbConfig = dbConfig[env];

export const sequelize = new Sequelize(
  currentDbConfig.database,
  currentDbConfig.username,
  currentDbConfig.password,
  {
    ...currentDbConfig,
    define: {
      freezeTableName: true,
    },
    logging: config.postgre.logging ? console.log : false,
  }
);

export const models = {
  Psychologist: psychologist(sequelize),
};
