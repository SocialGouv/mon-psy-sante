import { DSPsychologist, Psychologist } from "../../types/psychologist";
import config from "../config";
import getAddressCoordinates from "../getAddressCoordinates";

const parseDossierMetadata = async (
  dossier: DSPsychologist
): Promise<Psychologist> => {
  const psychologist: Partial<Psychologist> = {
    archived: dossier.archived,
    email: dossier.usager.email,
    firstName: dossier.demandeur.prenom,
    id: dossier.number,
    instructorId: dossier.groupeInstructeur.id,
    lastName: dossier.demandeur.nom,
  };

  JSON.parse(config.demarchesSimplifiees.champs).forEach(([id, field]) => {
    const dossierChamp = dossier.champs.find((champ) => champ.id === id);
    if (dossierChamp) {
      if (field === "teleconsultation") {
        psychologist.teleconsultation = dossierChamp.stringValue === "true";
      } else {
        psychologist[field] = dossierChamp.stringValue;
      }
    }
  });

  const coordinates = await getAddressCoordinates(psychologist.address);
  if (coordinates) {
    psychologist.longitude = coordinates.longitude;
    psychologist.latitude = coordinates.latitude;
  }

  return psychologist as Psychologist;
};

const parsePsychologists = async (
  dsPsychologists: DSPsychologist[]
): Promise<Psychologist[]> => {
  console.log(`Parsing ${dsPsychologists.length} psychologists from DS API`);

  return Promise.all(
    dsPsychologists.map(async (dsPsychologist) =>
      parseDossierMetadata(dsPsychologist)
    )
  );
};

export default parsePsychologists;
