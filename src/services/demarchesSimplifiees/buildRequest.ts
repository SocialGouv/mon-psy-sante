import { gql } from "graphql-request";

import { DSResponse } from "../../types/demarcheSimplifiee";
import config from "../config";
import { request } from "./request";

const getWhereConditionAfterCursor = (cursor: string): string => {
  if (cursor) {
    return ` after: "${cursor}"`;
  }
  return "";
};

export const requestPsychologistsState = async (
  afterCursor: string | undefined,
  extraInfos?: string | undefined
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
          ${extraInfos ?? ""}
      }
    }
  }
}
`;

  return request(query);
};

export const requestPsychologistsFor =
  (date: Date, filter: string) =>
  async (afterCursor: string | undefined): Promise<DSResponse> => {
    const paginationCondition = getWhereConditionAfterCursor(afterCursor);
    const dateFilter = date ? `updatedSince: "${date.toISOString()}"` : "";
    const query = gql`
    {
      demarche (number: ${config.demarchesSimplifiees.id}) {
        id
        dossiers (${filter}, ${dateFilter}${paginationCondition}) {
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

export const requestPsychologistsById = async (
  id: number
): Promise<DSResponse> => {
  const query = gql`
    {
      dossier (number: ${id}) {
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
  `;

  return request(query);
};
