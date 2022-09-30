import pLimit from "p-limit";

import { DSResponse, DSResponseNIRNode } from "../../types/demarcheSimplifiee";
import { DSPsychologist, Psychologist } from "../../types/psychologist";
import { formatPsychologist } from "../format-psychologists";
import {
  requestDossiersWithAnnotations,
  requestNIR,
  requestPsychologistsFor,
} from "./buildRequest";
import parseDossiers from "./parse-psychologists";

const limit = pLimit(5);

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
  const dossiers = parseDossiers(list.psychologists);
  const results = {
    lastCursor: list.lastCursor,
    psychologists: await Promise.all(
      dossiers.map(async (dossier) => limit(() => formatPsychologist(dossier)))
    ),
  };
  console.timeEnd(time);

  return results;
};

export const getDossiersInConstruction = async (): Promise<
  DSPsychologist[]
> => {
  const time = `Fetching all psychologists folders in construction from DS`;

  console.time(time);
  const list = await getAllPsychologistList((cursor) =>
    requestDossiersWithAnnotations(cursor)
  );
  console.timeEnd(time);

  return list.psychologists;
};

export const getNIRs = async (
  cursor: string | undefined = undefined,
  accumulator: DSResponseNIRNode[] = []
): Promise<{
  NIRs: DSResponseNIRNode[];
  lastCursor: string;
}> => {
  const apiResponse = await requestNIR(cursor);

  const { pageInfo, nodes } = apiResponse.demarche.dossiers;
  console.log(
    "NIR: Fetch",
    apiResponse.demarche.dossiers.nodes.length,
    "dossiers"
  );
  const nextAccumulator = accumulator.concat(nodes);

  if (pageInfo.hasNextPage) {
    return getNIRs(pageInfo.endCursor, nextAccumulator);
  }
  return {
    lastCursor: pageInfo.endCursor,
    NIRs: nextAccumulator,
  };
};
