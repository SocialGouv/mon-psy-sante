import { gql } from "graphql-request";

import { DSResponse } from "../../types/demarcheSimplifiee";
import config from "../config";
import { request } from "./request";

enum DossierState {
  enConstruction = "en_construction",
  enInstruction = "en_instruction",
  accepte = "accepte",
  refuse = "refuse",
  sansSuite = "sans_suite",
}

const getWhereConditionAfterCursor = (cursor: string): string => {
  if (cursor) {
    return ` after: "${cursor}"`;
  }
  return "";
};

export const requestPsychologistsState = async (
  afterCursor: string | undefined
): Promise<DSResponse> => {
  const paginationCondition = getWhereConditionAfterCursor(afterCursor);
  const query = gql`
{
  demarche (number: ${config.demarchesSimplifiees.id}) {
    id
    dossiers ${paginationCondition ? "(" + paginationCondition + ")" : ""} {
      pageInfo {
        hasNextPage
        endCursor
      }
      nodes {
          archived
          state
          number
      }
    }
  }
}
`;

  return request(query);
};

export const requestPsychologistsAcceptes = async (
  afterCursor: string | undefined
): Promise<DSResponse> => {
  const paginationCondition = getWhereConditionAfterCursor(afterCursor);
  const query = gql`
    {
      demarche (number: ${config.demarchesSimplifiees.id}) {
        id
        dossiers (state: ${DossierState.accepte}${paginationCondition}) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
              archived
              number
              groupeInstructeur {
                id
                label
              }
              state
              champs {
                id
                label
                stringValue
              }
              usager {
                email
              }
              demandeur {
                ... on PersonnePhysique {
                  civilite
                  nom
                  prenom
                }
              }
          }
        }
      }
    }
  `;

  return request(query);
};
