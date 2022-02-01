import doctor from "./doctor";
import general from "./general";
import children from "./patient/children";
import diffculties from "./patient/diffculties";
import process from "./patient/process";
import agreement from "./psy/agreement";
import billing from "./psy/billing";
import eligibility from "./psy/eligibility";
import patient from "./psy/patient";
import registration from "./psy/registration";

const items = {
  general: {
    sections: [{ faq: general }],
  },
  medecin: {
    sections: [{ faq: doctor }],
    title: "Patients",
  },
  patient: {
    sections: [
      { faq: process, title: "Déroulé du parcours" },
      { faq: children, title: "Zoom pour les patients de moins de 18 ans" },
      { faq: diffculties, title: "En cas de difficulté" },
    ],
    title: "Médecins",
  },
  psychologue: {
    sections: [
      { faq: eligibility, title: "Éligibilité" },
      { faq: registration, title: "Candidature" },
      {
        faq: patient,
        title: "Parcours du patient",
      },
      { faq: agreement, title: "Conventionnement avec l’Assurance Maladie" },
      { faq: billing, title: "Facturation / remboursement" },
    ],
    title: "Psychologues",
  },
};

export default items;
