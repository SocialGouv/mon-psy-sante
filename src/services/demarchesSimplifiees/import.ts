import { DSResponse } from "../../../types/demarcheSimplifiee";
import { DSPsychologist, Psychologist } from "../../../types/psychologist";
import { requestPsychologists } from "./buildRequest";
import parsePsychologists from "./parsePsychologists";

const getAllPsychologistList = async (
  graphqlFunction: (string) => Promise<DSResponse>,
  cursor: string | undefined = undefined,
  accumulator: DSPsychologist[] = []
): Promise<{
  psychologists: DSPsychologist[];
  lastCursor: string;
}> => {
  const apiResponse = await graphqlFunction(cursor);

  const { pageInfo, nodes } = apiResponse.demarche.dossiers;

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
  cursor: string | undefined
): Promise<{
  psychologists: Psychologist[];
  lastCursor: string;
}> => {
  const time = `Fetching all psychologists from DS (query id #${Math.random().toString()})`;

  console.time(time);
  const list = await getAllPsychologistList(requestPsychologists, cursor);
  const results = {
    lastCursor: list.lastCursor,
    psychologists: await parsePsychologists(list.psychologists),
  };
  console.timeEnd(time);

  return results;
};
