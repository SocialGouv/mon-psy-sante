import eligibility from "./psy/eligibility";
import registration from "./psy/registration";
import patient from "./psy/patient";
import agreement from "./psy/agreement";
import billing from "./psy/billing";
import doctor from "./doctor";
import general from "./general";
import process from "./patient/process";
import children from "./patient/children";
import diffculties from "./patient/diffculties";

const items = {
  general: {
    sections: [{ faq: general }],
  },
  psychologue: {
    title: "Psychologues",
    sections: [
      { title: "Éligibilité", faq: eligibility },
      { title: "Candidature", faq: registration },
      {
        title: "Parcours du patient",
        faq: patient,
      },
      { title: "Conventionnement avec l’Assurance Maladie", faq: agreement },
      { title: "Facturation / remboursement", faq: billing },
    ],
  },
  medecin: {
    title: "Patients",
    sections: [{ faq: doctor }],
  },
  patient: {
    title: "Médecins",
    sections: [
      { title: "Déroulé du parcours", faq: process },
      { title: "Zoom pour les patients de moins de 18 ans", faq: children },
      { title: "En cas de difficulté", faq: diffculties },
    ],
  },
};

export default items;
