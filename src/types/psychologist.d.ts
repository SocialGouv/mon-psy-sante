import { CoordinatesPostgis } from "./coordinates";
import { DistanceBasedOn } from "./enums/psychologist";

export interface Psychologist {
  id: number;
  firstName: string;
  lastName: string;
  archived: boolean;
  phone: string;
  displayPhone: boolean;
  address: string;
  addressAdditional?: string;
  secondAddress: string;
  secondAddressAdditional?: string;
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
  department: string;
  state: string;
  adeliId: string;
  demarcheSimplifieesId?: string;
  // These two parameters are dynamically generated
  // by API when querying via latitude and longitude.
  distance?: number;
  distanceBasedOn?: DistanceBasedOn;
}

export interface DSPsychologist {
  id: string;
  archived: boolean;
  number: number;
  state: string;
  dateTraitement?: string;
  messages?: {
    createdAt?: string;
    body?: string;
  }[];
  groupeInstructeur: {
    id: string;
    label: string;
  };
  instructeurs?: {
    id: string;
    email: string;
  }[];
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
