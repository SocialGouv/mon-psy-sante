import { DSResponse } from "../../types/demarcheSimplifiee";
import { DSPsychologist, Psychologist } from "../../types/psychologist";
import {
  requestPsychologistsAcceptes,
  requestPsychologistsState,
} from "./buildRequest";
import parsePsychologists from "./parse-psychologists";

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
  cursor: string | undefined
): Promise<{
  psychologists: Psychologist[];
  lastCursor: string;
}> => {
  const time = `Fetching all psychologists from DS (query id #${Math.random().toString()} with cursor ${cursor})`;

  console.time(time);
  const list = await getAllPsychologistList(
    requestPsychologistsAcceptes,
    cursor
  );
  const results = {
    lastCursor: list.lastCursor,
    psychologists: await parsePsychologists(list.psychologists),
  };
  console.timeEnd(time);

  return results;
};

export const getPsychologistState = async (): Promise<
  Partial<Psychologist>[]
> => {
  const time = `Fetching all psychologists state from DS (query id #${Math.random().toString()})`;

  console.time(time);
  const list = await getAllPsychologistList(requestPsychologistsState);
  console.timeEnd(time);

  return list.psychologists.map((dossier) => ({
    archived: dossier.archived,
    id: dossier.number,
    state: dossier.state,
  }));
};
