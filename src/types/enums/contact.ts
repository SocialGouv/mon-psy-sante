export enum CONTACT_USER_TYPE {
  PSYCHOLOGIST_INTERESTED = "Psychologue intéressé / en cours de candidature",
  PSYCHOLOGIST_PARTNER = "Psychologue partenaire MonPsySanté (conventionné avec l'Assurance Maladie)",
  PUBLIC = "Grand public / Patient / Entourage d'un patient",
  DOCTOR = "Médecin / Professionnel de santé",
  OTHER = "Autre : institutionnels, presse, etc",
}

export enum CONTACT_REASON {
  ELIGIBILITY = "Question relative à mon éligibilité",
  GLOBAL = "Question générale sur le fonctionnement du dispositif",
  APPLICATION = "Question relative à l'avancement de ma candidature",
  OTHER = "Autres",
}

export const allContactUserTypes = Object.values(CONTACT_USER_TYPE);
export const allContactReasons = Object.values(CONTACT_REASON);
