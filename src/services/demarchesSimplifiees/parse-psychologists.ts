import { DSPsychologist, Psychologist } from "../../types/psychologist";
import config from "../config";
import { formatLanguage } from "../format-psychologists";

const extractDepartmentNumber = (dep: string): string => {
  return dep.split(" - ")[0];
};
const CHAMPS = JSON.parse(config.demarchesSimplifiees.champs);
const CHAMP_LANGUAGE_OTHER = "Q2hhbXAtMjM0NjQzNA==";

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

export const parseDossierMetadata = (dossier: DSPsychologist): Psychologist => {
  const psychologist: Partial<Psychologist> = {
    demarcheSimplifieesId: dossier.id,
    archived: dossier.archived,
    department: extractDepartmentNumber(dossier.groupeInstructeur.label),
    firstName: dossier.demandeur.prenom,
    id: dossier.number,
    lastName: dossier.demandeur.nom,
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

  return psychologist as Psychologist;
};

const parseDossiers = (dsPsychologists: DSPsychologist[]): Psychologist[] => {
  console.log(`Parsing ${dsPsychologists.length} psychologists from DS API`);
  return dsPsychologists.map((dsPsychologist) =>
    parseDossierMetadata(dsPsychologist)
  );
};

export default parseDossiers;
