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

export enum DossierState {
  enConstruction = "en_construction",
  enInstruction = "en_instruction",
  accepte = "accepte",
  refuse = "refuse",
  sansSuite = "sans_suite",
}
