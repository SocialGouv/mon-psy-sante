import { GraphQLClient } from "graphql-request";

import config from "../config";

const endpoint = config.demarchesSimplifiees.apiUrl;
const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${config.demarchesSimplifiees.apiToken}`,
  },
});

const logErrorsFromDS = (apiResponse: {
  response: { errors: string[] };
}): void => {
  if (apiResponse.response) {
    if (apiResponse.response.errors.length > 0) {
      apiResponse.response.errors.forEach((err) => {
        console.error("Error details", err);
      });
    }
  }
};

export const request = async (query: string, variables = undefined) => {
  try {
    return await graphQLClient.request(query, variables);
  } catch (err) {
    console.error("API has returned error", err);
    logErrorsFromDS(err);
    throw "Error from DS API";
  }
};
