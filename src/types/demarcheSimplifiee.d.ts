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
