import { gql } from "graphql-request";

import { DSResponse, DSResponseNIR } from "../../types/demarcheSimplifiee";
import { ParsedDSPsychologist } from "../../types/psychologist";
import config from "../config";
import { CHAMP_NIR } from "./parse-psychologists";
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

export const requestNIR = async (
  afterCursor: string | undefined
): Promise<DSResponseNIR> => {
  const paginationCondition = getWhereConditionAfterCursor(afterCursor);
  const query = gql`
  {
    demarche (number: ${config.demarchesSimplifiees.id}) {
      dossiers ${paginationCondition ? `(${paginationCondition})` : ""} {
      	pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          number
          champs (id: "${CHAMP_NIR}") {
            stringValue
          }
        }
      }
    }
  }`;
  return request(query);
};

export const requestDossiersEnConstruction = async (
  afterCursor: string | undefined
): Promise<DSResponse> => {
  return requestDossiersByState(DossierState.enConstruction, afterCursor);
};

export const requestDossiersRefusesWithMessages = async (
  afterCursor: string | undefined
): Promise<DSResponse> => {
  return requestDossiersByState(
    DossierState.refuse,
    afterCursor,
    "messages { body, createdAt }"
  );
};

export const requestDossiersEnInstruction = async (
  afterCursor: string | undefined
): Promise<DSResponse> => {
  return requestDossiersByState(DossierState.enInstruction, afterCursor);
};

export const requestDossiersAccepte = async (
  afterCursor: string | undefined
): Promise<DSResponse> => {
  return requestDossiersByState(DossierState.accepte, afterCursor);
};

export const requestDossiersAllState = async (
  afterCursor: string | undefined
): Promise<DSResponse> => {
  return requestDossiersByState(null, afterCursor);
};

export const requestDossiersByState = async (
  state: DossierState | null,
  afterCursor: string | undefined,
  extraInfos?: string | undefined
): Promise<DSResponse> => {
  const paginationCondition = getWhereConditionAfterCursor(afterCursor);
  const stateCondition = state ? `state: ${state}` : "";
  const query = gql`
  {
    demarche (number: ${config.demarchesSimplifiees.id}) {
      dossiers ${
        stateCondition || paginationCondition
          ? "(" + stateCondition + paginationCondition + ")"
          : ""
      } {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          id
          number
          dateTraitement
          ${extraInfos ?? ""}
          champs {
            id
            label
            stringValue
          }
          instructeurs {
            id
            email
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
        }
      }
    }
  }`;

  return request(query);
};

export const addVerificationMessage = (
  dossierId: ParsedDSPsychologist["demarcheSimplifieesId"],
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
