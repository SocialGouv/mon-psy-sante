import Joi from "joi";

import { SRID } from "../types/const/geometry";
import { Coordinates, CoordinatesPostgis } from "../types/coordinates";
import { Psychologist } from "../types/psychologist";
import getAddressCoordinates from "./getAddressCoordinates";

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

export const formatLanguage = (value) => {
  if (value === undefined) return;
  if (!value) return null;
  const cleanFrench = value.trim().replace(frenchWord, "");
  return cleanFrench || undefined;
};

const FORMATTERS = {
  firstName: formatFirstName,
  lastName: (value) => value.toUpperCase().trim(),
  email: (value) =>
    emailSchema.validate({ email: value }).error
      ? undefined
      : value.toLowerCase(),
  languages: formatLanguage,
  website: (value) =>
    websiteSchema.validate({ website: value }).error
      ? undefined
      : value.toLowerCase(),
};
const parseChampValue = (field, value) =>
  FORMATTERS[field] ? FORMATTERS[field](value) : value;

export const formatCoordinates = (
  coordinates: Coordinates
): CoordinatesPostgis => {
  return {
    coordinates: [coordinates.longitude, coordinates.latitude],
    crs: { properties: { name: "EPSG:" + SRID }, type: "name" },
    type: "POINT",
  };
};

export const formatPsychologist = async (
  psy: Partial<Psychologist>
): Promise<Psychologist> => {
  const psychologist: Partial<Psychologist> = {};

  Object.keys(psy).forEach((field) => {
    psychologist[field] = parseChampValue(field, psy[field]);
  });

  const identifier = psychologist.id?.toString() ?? psychologist.email;
  const coordinates = await getAddressCoordinates(
    identifier,
    psychologist.address
  );
  psychologist.coordinates = coordinates
    ? formatCoordinates(coordinates)
    : null;

  if (psychologist.secondAddress) {
    const coordinates = await getAddressCoordinates(
      identifier,
      psychologist.secondAddress
    );
    psychologist.secondAddressCoordinates = coordinates
      ? formatCoordinates(coordinates)
      : null;
  }
  return psychologist as Psychologist;
};

export default formatPsychologist;
