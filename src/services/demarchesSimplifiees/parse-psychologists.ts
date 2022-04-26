import Joi from "joi";
import pLimit from "p-limit";

import { SRID } from "../../types/const/geometry";
import { Coordinates, CoordinatesPostgis } from "../../types/coordinates";
import { DSPsychologist, Psychologist } from "../../types/psychologist";
import config from "../config";
import getAddressCoordinates from "../getAddressCoordinates";

const limit = pLimit(5);

const extractDepartmentNumber = (dep: string): string => {
  return dep.split(" - ")[0];
};
const CHAMPS = JSON.parse(config.demarchesSimplifiees.champs);
const CHAMP_LANGUAGE_OTHER = "Q2hhbXAtMjM0NjQzNA==";
const websiteSchema = Joi.object({
  website: Joi.string().uri().required(),
});
const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});
const frenchWord = new RegExp(
  "(français|francais|langue française)(?:\\s?et\\s?)?[^a-zA-Z]*",
  "ig"
);

const capitalizeFirstLetter = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

function formatFirstName(string) {
  return string
    .trim()
    .split(" ")
    .map((word) => word.split("-").map(capitalizeFirstLetter).join("-"))
    .join(" ");
}

const formatLanguage = (value) => {
  if (!value) return;
  const cleanFrench = value.trim().replace(frenchWord, "");
  return cleanFrench || undefined;
};

const parsers = {
  displayEmail: (value) => value === "true",
  email: (value) =>
    emailSchema.validate({ email: value }).error
      ? undefined
      : value.toLowerCase(),
  languages: formatLanguage,
  teleconsultation: (value) => value === "true",
  website: (value) =>
    websiteSchema.validate({ website: value }).error
      ? undefined
      : value.toLowerCase(),
};
const parseChampValue = (field, value) =>
  parsers[field] ? parsers[field](value) : value;

export const formatCoordinates = (
  coordinates: Coordinates
): CoordinatesPostgis => {
  return {
    coordinates: [coordinates.longitude, coordinates.latitude],
    crs: { properties: { name: "EPSG:" + SRID }, type: "name" },
    type: "POINT",
  };
};

const getDossierChamp = (dossier: DSPsychologist, id) =>
  dossier.champs.find((champ) => champ.id === id);

const addOtherLanguages = (
  dossier: DSPsychologist,
  psychologist: Partial<Psychologist>
) => {
  const dossierChamp = getDossierChamp(dossier, CHAMP_LANGUAGE_OTHER);
  const otherLanguage = parseChampValue("languages", dossierChamp?.stringValue);
  if (otherLanguage) {
    psychologist.languages = psychologist.languages
      ? psychologist.languages + ", " + otherLanguage
      : otherLanguage;
  }
};

export const parseDossierMetadata = async (
  dossier: DSPsychologist
): Promise<Psychologist> => {
  const psychologist: Partial<Psychologist> = {
    archived: dossier.archived,
    department: extractDepartmentNumber(dossier.groupeInstructeur.label),
    firstName: formatFirstName(dossier.demandeur.prenom),
    id: dossier.number,
    instructorId: dossier.groupeInstructeur.id,
    lastName: dossier.demandeur.nom.toUpperCase().trim(),
    state: dossier.state,
  };

  CHAMPS.forEach(([id, field]) => {
    const dossierChamp = getDossierChamp(dossier, id);
    const parsedValue = parseChampValue(field, dossierChamp?.stringValue);
    if (parsedValue !== undefined) {
      psychologist[field] = parsedValue;
    }
  });
  addOtherLanguages(dossier, psychologist);

  const coordinates = await getAddressCoordinates(
    dossier.number.toString(),
    psychologist.address
  );
  if (coordinates) {
    psychologist.coordinates = formatCoordinates(coordinates);
  }

  if (psychologist.secondAddress) {
    const coordinates = await getAddressCoordinates(
      dossier.number.toString(),
      psychologist.secondAddress
    );
    if (coordinates) {
      psychologist.secondAddressCoordinates = formatCoordinates(coordinates);
    }
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
