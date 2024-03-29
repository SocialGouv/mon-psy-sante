import * as dotenv from "dotenv";

dotenv.config();

const parseBoolean = (value: string | undefined) => value === "true";

export default {
  adeli: {
    apiUrl:
      "https://datasette-ps-libre-acces.dev.fabrique.social.gouv.fr/PS_LibreAcces/PS_LibreAcces_Personne_activite.json",
  },
  contactMail: "",
  demarchesSimplifiees: {
    apiToken: process.env.DEMARCHES_SIMPLIFIEES_TOKEN,
    apiUrl: "https://www.demarches-simplifiees.fr/api/v2/graphql",
    champs: process.env.DEMARCHES_SIMPLIFIEES_CHAMPS,
    id: process.env.DEMARCHES_SIMPLIFIEES_ID,
    instructeurId: process.env.DEMARCHES_SIMPLIFIEES_INSTRUCTEUR_ID,
    writeAccess: parseBoolean(process.env.DEMARCHES_SIMPLIFIEES_WRITE_ACCESS),
    writeableId: process.env.DEMARCHES_SIMPLIFIEES_WRITABLE_ID,
    champVerifAuto:
      process.env.DEMARCHES_SIMPLIFIEES_CHAMP_VERIFICATIONS_AUTOMATIQUES,
  },
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
  },
  keycloak: {
    clientId: process.env.KEYCLOAK_ID,
    clientSecret: process.env.KEYCLOAK_SECRET,
    issuer: process.env.KEYCLOAK_ISSUER,
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
  postgre: {
    logging: parseBoolean(process.env.DB_LOGGING_ENABLE),
  },
  supportMail: process.env.SUPPORT_MAIL,
  reportingMailRecipients: process.env.REPORTING_MAIL_RECIPIENTS,
  apiAdresseUrl: process.env.API_ADRESSE_URL,
};
