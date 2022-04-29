import { DSResponse } from "../../types/demarcheSimplifiee";
import { DSPsychologist, Psychologist } from "../../types/psychologist";
import { requestPsychologistsFor } from "./buildRequest";
import parsePsychologists from "./parse-psychologists";

export const getAllPsychologistList = async (
  graphqlFunction: (string) => Promise<DSResponse>,
  cursor: string | undefined = undefined,
  accumulator: DSPsychologist[] = []
): Promise<{
  psychologists: DSPsychologist[];
  lastCursor: string;
}> => {
  const apiResponse = await graphqlFunction(cursor);

  const { pageInfo, nodes } = apiResponse.demarche.dossiers;
  console.log("Fetch", apiResponse.demarche.dossiers.nodes.length, "dossiers");
  const nextAccumulator = accumulator.concat(nodes);

  if (pageInfo.hasNextPage) {
    return getAllPsychologistList(
      graphqlFunction,
      pageInfo.endCursor,
      nextAccumulator
    );
  }
  return {
    lastCursor: pageInfo.endCursor,
    psychologists: nextAccumulator,
  };
};

export const getPsychologistList = async (
  date: Date,
  filter: string
): Promise<{
  psychologists: Psychologist[];
  lastCursor: string;
}> => {
  const time = `Fetch all psychologists from DS with ${filter} since ${date})`;

  console.time(time);
  const list = await getAllPsychologistList(
    requestPsychologistsFor(date, filter)
  );
  const results = {
    lastCursor: list.lastCursor,
    psychologists: await parsePsychologists(list.psychologists),
  };
  console.timeEnd(time);

  return results;
};
