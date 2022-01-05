export interface Psychologist {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  archived: boolean;
  phone: string;
  address: string;
  emailPro: string;
  teleconsultation: boolean;
  languages: string;
  website: string;
  longitude: number;
  latitude: number;
  instructorId: string;
}

export interface DSPsychologist {
  archived: boolean;
  number: number;
  state: string;
  groupeInstructeur: {
    id: string;
    label: string;
  };
  usager: {
    email: string;
  };
  demandeur: {
    nom: string;
    prenom: string;
  };
  champs: {
    id: string;
    label: string;
    stringValue: string;
  }[];
}
