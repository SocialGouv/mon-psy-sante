export interface Psychologist {
  id: number;
  firstName: string;
  lastName: string;
  archived: boolean;
  phone: string;
  address: string;
  teleconsultation: boolean;
  displayEmail: boolean;
  visible: boolean;
  email: string;
  public: string;
  languages: string;
  cdsmsp: string;
  website: string;
  coordinates: { type: string; coordinates: [number, number] };
  instructorId: string;
  state: string;
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
