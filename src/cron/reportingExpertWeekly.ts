import fs from "fs";
import _ from "lodash";

import { requestDossiersEnInstruction } from "../services/demarchesSimplifiees/buildRequest";
import { getAllPsychologistList } from "../services/demarchesSimplifiees/import";

const ANNOTATION_EXPERT1_ID = "Q2hhbXAtMjUzMTM2Mw==";
const COMMENTAIRE1 = "Q2hhbXAtMTg2MDUwOA==";
const COMMENTAIRE2 = "Q2hhbXAtMTg0NDM5Ng==";
const DOSSIER_ELIGIBLE = "Q2hhbXAtMTg0NDM5NQ==";
const INSTRUCTEURS = {
  "SW5zdHJ1Y3RldXItNjMyMjc=": "BS",
  "SW5zdHJ1Y3RldXItNjMyMzU=": "ACB",
  "SW5zdHJ1Y3RldXItNjMyMjk=": "ADS",
  "SW5zdHJ1Y3RldXItNjMyMzE=": "ES",
  "SW5zdHJ1Y3RldXItNjMyMzA=": "ADT",
  "SW5zdHJ1Y3RldXItNjMyMjg=": "SCO",
};

export async function reportingExpertWeekly() {
  console.log("Récupération des dossiers en instruction.");
  const result = await getAllPsychologistList(
    requestDossiersEnInstruction
  ).catch((e) => {
    console.log(e);
    process.exit(-1);
  });
  const psychologists = result.psychologists;

  const experts = Object.entries(
    _.groupBy(
      psychologists
        // Keep only the psychologist where DOSSIER_ELIGIBLE is not "OUI" or "NON"
        // since it means they are already done.
        .filter((psy) => {
          const dossierEligibleValue = psy.annotations.find(
            (a) => a.id === DOSSIER_ELIGIBLE
          )?.stringValue;
          return !["OUI", "NON"].includes(
            (dossierEligibleValue || "").toUpperCase().trim()
          );
        })
        // Find the "expert" in charge of the psychologist.
        .map((psy) => {
          let expertFromAnnotation = psy.annotations.find(
            (a) => a.id === ANNOTATION_EXPERT1_ID
          )?.stringValue;
          if (!expertFromAnnotation) {
            expertFromAnnotation =
              INSTRUCTEURS[
                psy.instructeurs.find((i) => Boolean(INSTRUCTEURS[i.id]))?.id
              ];
          }
          return {
            psychologist: psy,
            key: expertFromAnnotation,
          };
        })
        .filter((e) => Boolean(e.key)),
      ({ key }) => {
        return key;
      }
    )
  ).map(([key, value]) => {
    return {
      key,
      psycologistsCount: value.length,
      psycologists: value.map((e) => e.psychologist),
    };
  });

  for (const expert of experts) {
    const { key, psycologistsCount, psycologists } = expert;

    console.log(
      `Building report for expert ${key} (${psycologistsCount} dossiers)`
    );
    const data = [
      ["Dossier", "Commentaire 1", "Commentaire 2", "Eligible"].join(";"),
      ...psycologists.map((psy) => {
        return [
          psy.number,
          psy.annotations.find((a) => a.id === COMMENTAIRE1)?.stringValue,
          psy.annotations.find((a) => a.id === COMMENTAIRE2)?.stringValue,
          psy.annotations.find((a) => a.id === DOSSIER_ELIGIBLE)?.stringValue,
        ]
          .map((e) => `"${String(e).replace(/"/g, '""').replace(/\n/g, " ")}"`)
          .join(";");
      }),
    ];
    console.log(data);
    // create /out folder if it doesn't exist
    if (!fs.existsSync("out")) {
      fs.mkdirSync("out");
    }
    fs.writeFileSync(`out/expert-${key}.csv`, data.join("\n"));
  }
}
