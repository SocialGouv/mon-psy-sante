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
import reimbursement from "./patient/reimbursment";
import agreement from "./psy/agreement";
import billing from "./psy/billing";
import psyDoctor from "./psy/doctor";
import eligibility from "./psy/eligibility";
import ending from "./psy/ending";
import info from "./psy/info";
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
      { faq: reimbursement, title: "Remboursement" },
      { faq: end, title: "Fin du parcours" },
      { faq: children, title: "Patients de moins de 18 ans" },
      { faq: difficulty, title: "En cas de difficulté" },
      { faq: information, title: "Information sur la santé mentale" },
    ],
    title: "Patient",
    documents: [
      {
        url: "/documents/Mon soutien psy_Flyer grand public_2023-IMP.pdf",
        title: "Flyer Grand Public (PDF)",
      },
    ],
  },
  {
    documents: [
      {
        url: "/documents/Mon soutien psy_Guide psychologue_2023-IMP.pdf",
        title: "Guide pour les psychologues (PDF)",
      },
      {
        url: "/documents/Mon soutien psy_Livret_échelles évaluations_2023-IMP.pdf",
        title: "Echelles d’évaluation (PDF)",
      },
      {
        url: "/documents/Mon soutien psy_Feuille de soin_2023-IMP.pdf",
        title: "Comment compléter une feuille de soins ? (PDF)",
      },
      {
        url: "/documents/Mon soutien psy_Fiche-Mémo_Psychologue_2023-IMP.pdf",
        title: "Fiche mémo pour les psychologues (PDF)",
      },
    ],
    key: "psychologue",
    sections: [
      { faq: eligibility, title: "Éligibilité" },
      { faq: registration, title: "Candidature" },
      { faq: agreement, title: "Conventionnement avec l’Assurance Maladie" },
      { faq: info, title: "Informations dans l'annuaire" },
      { faq: patient, title: "Accompagnement du patient" },
      { faq: psyDoctor, title: "Echanges d’informations avec le médecin" },
      { faq: billing, title: "Facturation & remboursement" },
      { faq: ending, title: "Retrait du dispositif" },
    ],
    title: "Psychologue",
  },
  {
    key: "medecin",
    documents: [
      {
        title: "Guide pour les médecins (PDF)",
        url: "/documents/Mon soutien psy_Guide médecin_2023_IMP.pdf",
      },
      {
        title: "Fiche mémo pour les médecins (PDF)",
        url: "/documents/Mon soutien psy_Fiche-Mémo_médecin_2023-IMP.pdf",
      },
      {
        title: "Echelles d’évaluation (PDF)",
        url: "/documents/Mon soutien psy_Livret_échelles évaluations_2023-IMP.pdf",
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
