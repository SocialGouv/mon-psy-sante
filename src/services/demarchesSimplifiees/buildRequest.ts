import { gql } from "graphql-request";

import { DSResponse } from "../../../types/demarcheSimplifiee";
import config from "../config";
import { request } from "./request";

const getWhereConditionAfterCursor = (cursor: string): string => {
  if (cursor) {
    return `(after: "${cursor}")`;
  }
  return "";
};

export const requestPsychologists = async (
  afterCursor: string | undefined
): Promise<DSResponse> => {
  const paginationCondition = getWhereConditionAfterCursor(afterCursor);
  const query = gql`
    {
      demarche (number: ${config.demarchesSimplifiees.id}) {
        id
        dossiers ${paginationCondition} {
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
