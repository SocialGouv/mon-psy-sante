import { DSPsychologist } from "./psychologist";

export interface DSResponse {
  demarche: {
    dossiers: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
      nodes: DSPsychologist[];
    };
  };
}

export interface DSResponseNIRNode {
  number: number;
  champs: {
    stringValue: string;
  }[];
}

export interface DSResponseNIR {
  demarche: {
    dossiers: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
      nodes: DSResponseNIRNode[];
    };
  };
}
