export enum CONTACT_USER_TYPE {
  PSYCHOLOGIST_INTERESTED = "Psychologue intéressé / candidat",
  PSYCHOLOGIST_PARTNER = "Psychologue conventionné avec l'Assurance Maladie",
  PUBLIC = "Grand public / Patient / Entourage d'un patient",
  DOCTOR = "Médecin / Professionnel de santé",
  OTHER = "Autre : institutionnels, presse, etc",
}

export enum CONTACT_REASON {
  ELIGIBILITY = "Éligibilité",
  GLOBAL = "Fonctionnement du dispositif",
  APPLICATION = "Avancement de ma candidature",
  OTHER = "Autre",
}

export const allContactUserTypes = Object.values(CONTACT_USER_TYPE);
export const allContactReasons = Object.values(CONTACT_REASON);
