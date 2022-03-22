import exchange from "./doctor/exchange";
import orientation from "./doctor/orientation";
import practices from "./doctor/practices";
import general from "./general";
import accompaniment from "./patient/accompaniment";
import begin from "./patient/begin";
import children from "./patient/children";
import difficulty from "./patient/difficulty";
import eligibilityPatient from "./patient/eligibility";
import end from "./patient/end";
import information from "./patient/information";
import reimbursment from "./patient/reimbursment";
import agreement from "./psy/agreement";
import billing from "./psy/billing";
import psyDoctor from "./psy/doctor";
import eligibility from "./psy/eligibility";
import ending from "./psy/ending";
import patient from "./psy/patient";
import registration from "./psy/registration";

const items = [
  {
    key: "general",
    sections: [{ faq: general }],
    title: "Présentation",
  },
  {
    key: "patient",
    sections: [
      { faq: eligibilityPatient, title: "Éligibilité" },
      { faq: begin, title: "Début du parcours" },
      { faq: accompaniment, title: "Accompagnement par le psychologue" },
      { faq: reimbursment, title: "Remboursement" },
      { faq: end, title: "Fin du parcours" },
      { faq: children, title: "Patients de moins de 18 ans" },
      { faq: difficulty, title: "En cas de difficulté" },
      { faq: information, title: "Information sur la santé mentale" },
    ],
    title: "Patient",
  },
  {
    documents: [
      {
        url: "/documents/MonPsy_Guide psychologue_2022.pdf",
        title: "Guide pour les psychologues",
      },
      {
        url: "/documents/MonPsy_Livret_échelles évaluations_2022.pdf",
        title: "Echelles d’évaluation",
      },
      {
        url: "/documents/MonPsy_Flyer-Feuille de soin_2022.pdf",
        title: "Comment compléter une feuille de soins ?",
      },
      {
        url: "/documents/MonPsy_Fiche-Memo_Psy.pdf",
        title: "Fiche mémo pour les psychologues",
      },
    ],
    key: "psychologue",
    sections: [
      { faq: eligibility, title: "Éligibilité" },
      { faq: registration, title: "Candidature" },
      { faq: agreement, title: "Conventionnement avec l’Assurance Maladie" },
      {
        faq: patient,
        title: "Accompagnement du patient",
      },
      {
        faq: psyDoctor,
        title: "Echanges d’informations avec le médecin",
      },
      { faq: billing, title: "Facturation & remboursement" },
      { faq: ending, title: "Retrait du dispositif" },
    ],
    title: "Psychologue",
  },
  {
    key: "medecin",
    documents: [
      {
        title: "Echelles d’évaluation",
        url: "/documents/MonPsy_Livret_échelles évaluations_2022.pdf",
      },
    ],
    sections: [
      { faq: orientation, title: "Orientation du patient" },
      { faq: practices, title: "Bonnes pratiques" },
      {
        faq: exchange,
        title: "Echanges avec le psychologue et suite de la prise en charge",
      },
    ],
    title: "Médecin",
  },
];

export default items;
