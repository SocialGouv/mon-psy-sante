import Joi from "joi";
import pLimit from "p-limit";

import { SRID } from "../../types/const/geometry";
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
const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});
const isFrench = new RegExp("(français|francais)", "g");

const capitalizeFirstLetter = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

function formatFirstName(string) {
  return string
    .split(" ")
    .map((word) => word.split("-").map(capitalizeFirstLetter).join("-"))
    .join(" ");
}

const parsers = {
  displayEmail: (value) => value === "true",
  email: (value) =>
    emailSchema.validate({ email: value }).error
      ? undefined
      : value.toLowerCase(),
  languages: (value) =>
    !value || value.trim().toLowerCase().match(isFrench) ? undefined : value,
  teleconsultation: (value) => value === "true",
  website: (value) =>
    websiteSchema.validate({ website: value }).error
      ? undefined
      : value.toLowerCase(),
};
const parseChampValue = (field, value) =>
  parsers[field] ? parsers[field](value) : value;

export const parseDossierMetadata = async (
  dossier: DSPsychologist
): Promise<Psychologist> => {
  const psychologist: Partial<Psychologist> = {
    archived: dossier.archived,
    department: extractDepartmentNumber(dossier.groupeInstructeur.label),
    firstName: formatFirstName(dossier.demandeur.prenom),
    id: dossier.number,
    instructorId: dossier.groupeInstructeur.id,
    lastName: dossier.demandeur.nom.toUpperCase(),
    state: dossier.state,
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
      crs: { properties: { name: "EPSG:" + SRID }, type: "name" },
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
