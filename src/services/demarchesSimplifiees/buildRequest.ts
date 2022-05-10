import { gql } from "graphql-request";

import { DSResponse } from "../../types/demarcheSimplifiee";
import { Psychologist } from "../../types/psychologist";
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

export const requestDossiersWithAnnotations = async (
  afterCursor: string | undefined
): Promise<DSResponse> => {
  const paginationCondition = getWhereConditionAfterCursor(afterCursor);
  const query = gql`
  {
    demarche (number: ${config.demarchesSimplifiees.id}) {
      dossiers (state: ${DossierState.enConstruction}${paginationCondition}) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id,
          number
          champs {
            id
            label
            stringValue
          }
          groupeInstructeur {
            id
            label
          }
          annotations {
            id
            label
            stringValue
          }
          demandeur {
            ... on PersonnePhysique {
              nom
              prenom
            }
          }
        }
      }
    }
  }`;

  return request(query);
};

export const addVerificationMessage = (
  dossierId: Psychologist["demarcheSimplifieesId"],
  message: string
) => {
  const writeId = config.demarchesSimplifiees.writeAccess
    ? dossierId
    : config.demarchesSimplifiees.writeableId;

  if (!config.demarchesSimplifiees.writeAccess) {
    console.log(
      `Writing in ${writeId} instead of ${dossierId} because write access is disabled`
    );
  }

  const query = gql`
    mutation dossierModifierAnnotationText(
      $input: DossierModifierAnnotationTextInput!
    ) {
      dossierModifierAnnotationText(input: $input) {
        errors {
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      dossierId: writeId,
      instructeurId: config.demarchesSimplifiees.instructeurId,
      annotationId: config.demarchesSimplifiees.champVerifAuto,
      value: message,
    },
  };

  return request(query, variables);
};
