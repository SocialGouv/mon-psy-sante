// https://www.notion.so/fabnummas/Notification-toutes-les-2-semaines-de-d-un-tat-des-dossiers-refus-s-d63ae90f8db54eeda2fb382e9416cb8c
import { requestDossiersRefusesWithMessages } from "../services/demarchesSimplifiees/buildRequest";
import { getAllPsychologistList } from "../services/demarchesSimplifiees/import";
import { sendEmailWithAttachments } from "./cronUtils";

const ANNOTATION_EXPERT1_ID = "Q2hhbXAtMjUzMTM2Mw==";
const ANNOTATION_EXPERT2_ID = "Q2hhbXAtMjUzMTM2NQ==";
const COMMENT_STEP1 = "Q2hhbXAtMTg2MDUwOA==";
const COMMENT_STEP2 = "Q2hhbXAtMTg0NDM5Ng==";
const COMMENT_STEP3 = "Q2hhbXAtMjMwOTI5MA==";
const MOTIF_REFUS = "Q2hhbXAtMjMyMzExNg==";
const INSTRUCTEURS = {
  "SW5zdHJ1Y3RldXItNjMyMjc=": "BS",
  "SW5zdHJ1Y3RldXItNjMyMzU=": "ACB",
  "SW5zdHJ1Y3RldXItNjMyMjk=": "ADS",
  "SW5zdHJ1Y3RldXItNjMyMzE=": "ES",
  "SW5zdHJ1Y3RldXItNjMyMzA=": "ADT",
  "SW5zdHJ1Y3RldXItNjMyMjg=": "SCO",
};

function getFromAnnotation(psychologist, annotationId) {
  return psychologist.annotations.find((a) => a.id === annotationId)
    ?.stringValue;
}

function csvCell(cell) {
  return `"${cell.replace(/[\r\n]{2,}/g, "\n").replace(/"/g, '""')}"`;
}

function formatMessages(messages) {
  return messages
    .map((m) => m.createdAt + " " + m.body.replace(/(?:\r\n|\r|\n)/g, " "))
    .join("\n");
}

export async function reportingDossierRefuse() {
  console.log("Récupération des dossiers refusés");

  const result = await getAllPsychologistList(
    requestDossiersRefusesWithMessages
  ).catch((e) => {
    console.log(e);
    process.exit(-1);
  });

  const psychologists = result.psychologists
    .map((psychologist) => {
      const expert1 = getFromAnnotation(psychologist, ANNOTATION_EXPERT1_ID);
      const expert2 = getFromAnnotation(psychologist, ANNOTATION_EXPERT2_ID);
      const commentStep1 = getFromAnnotation(psychologist, COMMENT_STEP1);
      const commentStep2 = getFromAnnotation(psychologist, COMMENT_STEP2);
      const commentStep3 = getFromAnnotation(psychologist, COMMENT_STEP3);
      const motifRefus = getFromAnnotation(psychologist, MOTIF_REFUS);

      const instructeurs = psychologist.instructeurs
        .filter((i) => Boolean(INSTRUCTEURS[i.id]))
        .map((i) => INSTRUCTEURS[i.id])
        .join(",");
      return {
        ...psychologist,
        expert1,
        expert2,
        instructeurs,
        commentStep1,
        commentStep2,
        commentStep3,
        motifRefus,
      };
    })
    .map((psychologist) => {
      return [
        psychologist.number,
        psychologist.dateTraitement,
        psychologist.expert1,
        psychologist.expert2,
        psychologist.instructeurs,
        csvCell(psychologist.commentStep1),
        csvCell(psychologist.commentStep2),
        csvCell(psychologist.commentStep3),
        csvCell(psychologist.motifRefus),
        psychologist.messages.length
          ? psychologist.messages[psychologist.messages.length - 1].createdAt
          : "",
        csvCell(formatMessages(psychologist.messages)),
      ].join(";");
    });
  const header = [
    "Numéro",
    "Date de traitement",
    "Expert 1",
    "Expert 2",
    "Instructeurs",
    "Commentaire étape 1",
    "Commentaire étape 2",
    "Commentaire étape 3",
    "Motif de refus",
    "Date du dernier message",
    "Messages",
  ].join(";");
  console.log([header, ...psychologists].join("\n"));
  return sendEmailWithAttachments({
    subject: "Fichiers de suivi des dossiers refusés",
    textSlices: [
      "Bonjour,",
      "Ci-joint le fichier de suivi des dossiers refusés.",
    ],
    attachments: [
      {
        filename: `dossiers-refusés.csv`,
        content: Buffer.from([header, ...psychologists].join("\n")),
      },
    ],
  });
}
