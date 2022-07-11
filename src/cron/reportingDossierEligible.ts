// https://www.notion.so/fabnummas/Export-lundi-10h-dossier-ligibles-conventionner-c9dc9247bc0841e48dbd33513c03eb62
import {
  requestDossiersEnConstruction,
  requestDossiersEnInstruction,
} from "../services/demarchesSimplifiees/buildRequest";
import { getAllPsychologistList } from "../services/demarchesSimplifiees/import";

const NOTIFICATION_SELECTION = "Q2hhbXAtMjMyMzA2Mg==";

export async function reportingDossierEligible() {
  console.log("Récupération des dossiers en instruction et en construction");
  const results = await Promise.all(
    [requestDossiersEnInstruction, requestDossiersEnConstruction].map(
      (request) =>
        getAllPsychologistList(request).catch((e) => {
          console.log(e);
          process.exit(-1);
        })
    )
  );
  const psychologists = [
    ...results[0].psychologists,
    ...results[1].psychologists,
  ]
    .filter((psychologist) => {
      const dossierEligibleValue = psychologist.annotations.find(
        (a) => a.id === NOTIFICATION_SELECTION
      )?.stringValue;
      return dossierEligibleValue === `Notifié "éligible"`;
    })
    .map((psychologist) => {
      return {
        id: psychologist.id,
        groupeInstructeur: psychologist.groupeInstructeur.label,
      };
    })
    .sort((a, b) => {
      if (a.groupeInstructeur < b.groupeInstructeur) return -1;
      if (a.groupeInstructeur > b.groupeInstructeur) return 1;
      return 0;
    })
    .map((psychologist) => {
      return [psychologist.groupeInstructeur, psychologist.id].join(";");
    })
    .join("\n");
  console.log(psychologists);
}
