import { CoordinatesPostgis } from "./coordinates";

export interface Psychologist {
  id: number;
  firstName: string;
  lastName: string;
  archived: boolean;
  phone: string;
  address: string;
  addressAdditional: string;
  secondAddress: string;
  secondAddressAdditional: string;
  teleconsultation: boolean;
  displayEmail: boolean;
  visible: boolean;
  email: string;
  public: string;
  languages: string;
  cdsmsp: string;
  website: string;
  coordinates: CoordinatesPostgis;
  secondAddressCoordinates: CoordinatesPostgis;
  instructorId: string;
  department: string;
  state: string;
  distance?: number;
  adeliId: string;
  demarcheSimplifieesId?: string;
}

export interface DSPsychologist {
  id: string;
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
  annotations?: {
    id: string;
    label: string;
    stringValue: string;
  }[];
}
