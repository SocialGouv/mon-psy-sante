import * as dotenv from "dotenv";

dotenv.config();

const parseBoolean = (value: string | undefined) => value === "true";

export default {
  contactMail: "",
  demarchesSimplifiees: {
    apiToken: process.env.DEMARCHES_SIMPLIFIEES_TOKEN,
    apiUrl: "https://www.demarches-simplifiees.fr/api/v2/graphql",
    champs: process.env.DEMARCHES_SIMPLIFIEES_CHAMPS,
    id: process.env.DEMARCHES_SIMPLIFIEES_ID,
  },
  mail: {
    auth: {
      pass: process.env.MAIL_AUTH_PASS,
      user: process.env.MAIL_AUTH_USER,
    },
    enabled: parseBoolean(process.env.MAIL_ENABLED),
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || "25", 10),
    tls: parseBoolean(process.env.MAIL_TLS),
  },
  minScoreAddress: parseFloat(process.env.MIN_SCORE_ADDRESS || "0.30"),
  nextAuthUrl: process.env.NEXTAUTH_URL,
  postgre: {
    logging: parseBoolean(process.env.DB_LOGGING_ENABLE),
    url: process.env.DATABASE_URL || "",
  },
  supportMail: process.env.SUPPORT_MAIL,
};
