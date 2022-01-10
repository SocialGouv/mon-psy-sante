const parseBoolean = (value: string) => value === "true";

export default {
  demarchesSimplifiees: {
    apiToken: process.env.DEMARCHES_SIMPLIFIEES_TOKEN,
    apiUrl: "https://www.demarches-simplifiees.fr/api/v2/graphql",
    champs: process.env.DEMARCHES_SIMPLIFIEES_CHAMPS,
    id: process.env.DEMARCHES_SIMPLIFIEES_ID,
  },
  displayDirectory: parseBoolean(process.env.NEXT_PUBLIC_DISPLAY_DIRECTORY),
  minScoreAddress: parseFloat(process.env.MIN_SCORE_ADDRESS || "0.55"),
  postgre: {
    logging: parseBoolean(process.env.DB_LOGGING_ENABLE),
    url: process.env.POSTGRESQL_URL,
  },
};
