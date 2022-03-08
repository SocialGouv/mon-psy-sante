import { DSPsychologist, Psychologist } from "../../types/psychologist";
import config from "../config";
import getAddressCoordinates from "../getAddressCoordinates";

const parseDossierMetadata = async (
  dossier: DSPsychologist
): Promise<Psychologist> => {
  const psychologist: Partial<Psychologist> = {
    archived: dossier.archived,
    firstName: dossier.demandeur.prenom,
    id: dossier.number,
    instructorId: dossier.groupeInstructeur.id,
    lastName: dossier.demandeur.nom,
    state: dossier.state,
  };

  JSON.parse(config.demarchesSimplifiees.champs).forEach(([id, field]) => {
    const dossierChamp = dossier.champs.find((champ) => champ.id === id);
    if (dossierChamp) {
      if (field === "teleconsultation" || field === "displayEmail") {
        psychologist[field] = dossierChamp.stringValue === "true";
      } else {
        psychologist[field] = dossierChamp.stringValue;
      }
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
      parseDossierMetadata(dsPsychologist)
    )
  );
};

export default parsePsychologists;
