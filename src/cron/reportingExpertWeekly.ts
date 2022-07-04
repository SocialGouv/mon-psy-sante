import { requestDossiersEnInstruction } from "../services/demarchesSimplifiees/buildRequest";
import { getAllPsychologistList } from "../services/demarchesSimplifiees/import";
import { sendEmailWithAttachments } from "./cronUtils";

const ANNOTATION_EXPERT1_ID = "Q2hhbXAtMjUzMTM2Mw==";
const ANNOTATION_EXPERT2_ID = "Q2hhbXAtMjUzMTM2NQ==";
const COMMENTAIRE1 = "Q2hhbXAtMTg2MDUwOA==";
const COMMENTAIRE2 = "Q2hhbXAtMTg0NDM5Ng==";
const DOSSIER_ELIGIBLE = "Q2hhbXAtMTg0NDM5NQ==";
const NOTIFICATION_SELECTION = "Q2hhbXAtMjMyMzA2Mg==";
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

  const psychologistsWithExperts = result.psychologists
    // Keep only the psychologist where DOSSIER_ELIGIBLE is not "OUI" or "NON"
    // and NOTIFICATION_SELECTION is not "OUI" or "NON"
    // since it means they are already treated.
    .filter((psy) => {
      const dossierEligibleValue = psy.annotations.find(
        (a) => a.id === DOSSIER_ELIGIBLE
      )?.stringValue;
      const notificationSelectionValue = psy.annotations.find(
        (a) => a.id === NOTIFICATION_SELECTION
      )?.stringValue;
      return (
        !["OUI", "NON"].includes(
          (dossierEligibleValue || "").toUpperCase().trim()
        ) &&
        !["OUI", "NON"].includes(
          (notificationSelectionValue || "").toUpperCase().trim()
        )
      );
    })
    // Find the "experts" in charge of the psychologist (there can be multiple experts)
    .map((psychologist) => {
      // Find via ANNOTATION_EXPERT1_ID and ANNOTATION_EXPERT2_ID.
      let experts = psychologist.annotations
        .filter(
          (a) =>
            a.id === ANNOTATION_EXPERT1_ID || a.id === ANNOTATION_EXPERT2_ID
        )
        .map((e) => e.stringValue);
      // If not found we have to parse instructeurs to find their ids.
      if (experts.length === 0) {
        experts = psychologist.instructeurs
          .filter((i) => Boolean(INSTRUCTEURS[i.id]))
          .map((i) => INSTRUCTEURS[i.id]);
      }
      // Return psychologist with their experts.
      return { psychologist, experts };
    })
    .filter((e) => e.experts.length > 0);

  const attachments = [];

  for (const expert of Object.values(INSTRUCTEURS)) {
    const psychologists = psychologistsWithExperts
      .filter((p) => p.experts.includes(expert))
      .map((e) => e.psychologist);
    const psychologistsCount = psychologists.length;

    console.log(
      `Building report for expert ${expert} (${psychologistsCount} dossiers)…`
    );
    const data = [
      ["Dossier", "Commentaire 1", "Commentaire 2", "Eligible"].join(";"),
      ...psychologists.map((psy) => {
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

    attachments.push({
      filename: `expert-${expert}.csv`,
      content: Buffer.from(data.join("\n")),
    });
  }
  return sendEmailWithAttachments({
    subject: "Fichiers de suivi par expert (en instruction)",
    textSlices: ["Bonjour,", "Ci-joint les fichiers de suivis par experts."],
    attachments,
  });
}
