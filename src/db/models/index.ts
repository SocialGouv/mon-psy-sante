import { Sequelize } from "sequelize";

import config from "../../services/config";
import dsCursor from "./dsCursor";
import psychologist from "./psychologist";
import userAccount from "./userAccount";

const sequelize = new Sequelize(config.postgre.url, {
  define: {
    freezeTableName: true,
  },
  dialect: "postgres",
  logging: config.postgre.logging ? console.log : false,
});

export const models = {
  DSCursor: dsCursor(sequelize),
  Psychologist: psychologist(sequelize),
  UserAccount: userAccount(sequelize),
};
