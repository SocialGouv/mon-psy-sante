import {
  DSPsychologist,
  ParsedDSPsychologist,
  Psychologist,
} from "../../types/psychologist";
import config from "../config";
import { formatLanguage } from "../format-psychologists";

const extractDepartmentNumber = (dep: string): string => {
  return dep.split(" - ")[0];
};
const CHAMPS = JSON.parse(config.demarchesSimplifiees.champs);
const CHAMP_LANGUAGE_OTHER = "Q2hhbXAtMjM0NjQzNA==";
export const CHAMP_NIR = "Q2hhbXAtMjM0NjQzNQ==";

const PARSERS = {
  displayEmail: (value) => value === "true",
  languages: formatLanguage,
  teleconsultation: (value) => value === "true",
};
const parseChampValue = (field, value) =>
  PARSERS[field] ? PARSERS[field](value) : value;

const getDossierChamp = (dossier: DSPsychologist, id) =>
  dossier.champs.find((champ) => champ.id === id);

const addOtherLanguages = (
  dossier: DSPsychologist,
  psychologist: Partial<Psychologist>
) => {
  const dossierChamp = getDossierChamp(dossier, CHAMP_LANGUAGE_OTHER);
  const otherLanguage = formatLanguage(dossierChamp?.stringValue);
  if (otherLanguage) {
    psychologist.languages = psychologist.languages
      ? psychologist.languages + ", " + otherLanguage
      : otherLanguage;
  }
};

export const parseDossierMetadata = (
  dossier: DSPsychologist
): ParsedDSPsychologist => {
  const psychologist: Partial<ParsedDSPsychologist> = {
    demarcheSimplifieesId: dossier.id,
    archived: dossier.archived,
    department: extractDepartmentNumber(dossier.groupeInstructeur.label),
    firstName: dossier.demandeur.prenom,
    id: dossier.number,
    lastName: dossier.demandeur.nom,
    state: dossier.state,
    nir: getDossierChamp(dossier, CHAMP_NIR)?.stringValue?.trim(),
  };

  CHAMPS.forEach(([id, field]) => {
    const dossierChamp = getDossierChamp(dossier, id);
    const parsedValue = parseChampValue(field, dossierChamp?.stringValue);
    if (parsedValue !== undefined) {
      psychologist[field] = parsedValue;
    }
  });
  addOtherLanguages(dossier, psychologist);

  return psychologist as ParsedDSPsychologist;
};

const parseDossiers = (
  dsPsychologists: DSPsychologist[]
): ParsedDSPsychologist[] => {
  console.log(`Parsing ${dsPsychologists.length} psychologists from DS API`);
  return dsPsychologists.map((dsPsychologist) =>
    parseDossierMetadata(dsPsychologist)
  );
};

export default parseDossiers;
