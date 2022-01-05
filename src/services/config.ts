import dotenv from "dotenv";

dotenv.config();

export default {
  demarchesSimplifiees: {
    apiToken: process.env.DEMARCHES_SIMPLIFIEES_TOKEN,
    apiUrl: "https://www.demarches-simplifiees.fr/api/v2/graphql",
    champs: process.env.DEMARCHES_SIMPLIFIEES_CHAMPS,
    id: process.env.DEMARCHES_SIMPLIFIEES_ID,
  },
  displayDirectory: process.env.DISPLAY_DIRECTORY,
  minScoreAddress: parseFloat(process.env.MIN_SCORE_ADDRESS || "0.55"),
  postgre: {
    logging: process.env.DB_LOGGING_ENABLE === "true",
    url: process.env.POSTGRESQL_URL,
  },
};
