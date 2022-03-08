import Joi from "joi";
import pLimit from "p-limit";

import { DSPsychologist, Psychologist } from "../../types/psychologist";
import config from "../config";
import getAddressCoordinates from "../getAddressCoordinates";

const limit = pLimit(5);

const extractDepartmentNumber = (dep: string): string => {
  return dep.split(" - ")[0];
};
const CHAMPS = JSON.parse(config.demarchesSimplifiees.champs);
const websiteSchema = Joi.object({
  website: Joi.string().uri().required(),
});

const isFrench = new RegExp("(français|francais)", "g");

const parsers = {
  displayEmail: (value) => value === "true",
  languages: (value) =>
    !value || value.trim().toLowerCase().match(isFrench) ? undefined : value,
  teleconsultation: (value) => value === "true",
  website: (value) =>
    websiteSchema.validate({ website: value }).error ? undefined : value,
};
const parseChampValue = (field, value) =>
  parsers[field] ? parsers[field](value) : value;

export const parseDossierMetadata = async (
  dossier: DSPsychologist
): Promise<Psychologist> => {
  const psychologist: Partial<Psychologist> = {
    archived: dossier.archived,
    department: extractDepartmentNumber(dossier.groupeInstructeur.label),
    firstName: dossier.demandeur.prenom,
    id: dossier.number,
    instructorId: dossier.groupeInstructeur.id,
    lastName: dossier.demandeur.nom,
  };

  CHAMPS.forEach(([id, field]) => {
    const dossierChamp = dossier.champs.find((champ) => champ.id === id);
    const parsedValue = parseChampValue(field, dossierChamp?.stringValue);
    if (parsedValue !== undefined) {
      psychologist[field] = parsedValue;
    }
  });

  const coordinates = await getAddressCoordinates(psychologist.address);
  if (coordinates) {
    psychologist.coordinates = {
      coordinates: [coordinates.longitude, coordinates.latitude],
      type: "POINT",
    };
  }

  return psychologist as Psychologist;
};

const parsePsychologists = async (
  dsPsychologists: DSPsychologist[]
): Promise<Psychologist[]> => {
  console.log(`Parsing ${dsPsychologists.length} psychologists from DS API`);
  return Promise.all(
    dsPsychologists.map(async (dsPsychologist) =>
      limit(() => parseDossierMetadata(dsPsychologist))
    )
  );
};

export default parsePsychologists;
