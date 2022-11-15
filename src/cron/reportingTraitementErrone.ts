// https://www.notion.so/fabnummas/Export-mardi-14h-traitement-erron-des-dossiers-96eb6d8b0f734556b7176758f68372fb
import {
  requestDossiersAccepte,
  requestDossiersAllState,
  requestDossiersEnConstruction,
  requestDossiersEnInstruction,
} from "../services/demarchesSimplifiees/buildRequest";
import { getAllPsychologistList } from "../services/demarchesSimplifiees/import";
import { sendEmailWithAttachments } from "./cronUtils";

const INSTRUCTEURS = {
  "SW5zdHJ1Y3RldXItNjMyMjc=": "BS",
  "SW5zdHJ1Y3RldXItNjMyMzU=": "ACB",
  "SW5zdHJ1Y3RldXItNjMyMjk=": "ADS",
  "SW5zdHJ1Y3RldXItNjMyMzE=": "ES",
  "SW5zdHJ1Y3RldXItNjMyMzA=": "ADT",
  "SW5zdHJ1Y3RldXItNjMyMjg=": "SCO",
  "SW5zdHJ1Y3RldXItNjExNTM=": "Beta-Gouv-AG",
  "SW5zdHJ1Y3RldXItNDk3NDI=": "Beta-Gouv-LG",
  "SW5zdHJ1Y3RldXItNzgwMjA=": "Beta-Gouv-CA",
};
const INSTRUCTEUR_FB = "SW5zdHJ1Y3RldXItNjQzNjI=";
const DOSSIER_ELIGIBLE = "Q2hhbXAtMTg0NDM5NQ==";
const NOTIFICATION_SELECTION = "Q2hhbXAtMjMyMzA2Mg==";
const EMAILS_CPAM = "@assurance-maladie.fr";

// Original request: "des dossiers en construction ouverts par un instructeur CPAM exclusivement"
export async function cpamOnly() {
  const result = await getAllPsychologistList(
    requestDossiersEnConstruction
  ).catch((e) => {
    console.log(e);
    process.exit(-1);
  });

  return result.psychologists
    .filter((psychologist) => {
      const instructeurs = psychologist.instructeurs.map((i) => i.id);
      const instructeursWithCpamOnly = instructeurs.filter(
        (instructeur) => !INSTRUCTEURS[instructeur]
      );
      return (
        instructeursWithCpamOnly.length === instructeurs.length &&
        instructeursWithCpamOnly.length > 0
      );
    })
    .map((psychologist) => {
      return psychologist.number;
    });
}

// Original request: "des dossiers tout statut confondu cochés éligibles (”OUI”) et non éligibles (”NON”) et dont la “notification de la sélection” n’a pas été cochée"
export async function notificationSelectionNotChecked() {
  const result = await getAllPsychologistList(requestDossiersAllState).catch(
    (e) => {
      console.log(e);
      process.exit(-1);
    }
  );

  return result.psychologists
    .filter((psy) => {
      const dossierEligibleValue = psy.annotations.find(
        (a) => a.id === DOSSIER_ELIGIBLE
      )?.stringValue;
      const notificationSelectionValue = psy.annotations.find(
        (a) => a.id === NOTIFICATION_SELECTION
      )?.stringValue;
      return (
        ["OUI", "NON"].includes(
          (dossierEligibleValue || "").toUpperCase().trim()
        ) &&
        // "Notification Sélection" empty
        !(notificationSelectionValue || "").toUpperCase().trim()
      );
    })
    .map((psychologist) => {
      return psychologist.number;
    });
}

// Original request: "des dossiers acceptés ni coché “éligible” et/ou ni cochés “notifiés éligibles”"
export async function notEligibleAccepted() {
  const result = await getAllPsychologistList(requestDossiersAccepte).catch(
    (e) => {
      console.log(e);
      process.exit(-1);
    }
  );

  return result.psychologists
    .filter((psy) => {
      const dossierEligibleValue = psy.annotations.find(
        (a) => a.id === DOSSIER_ELIGIBLE
      )?.stringValue;

      return (dossierEligibleValue || "").toUpperCase().trim() !== "OUI";
    })
    .map((psychologist) => {
      return psychologist.number;
    });
}

// Original request: "des dossiers en instruction coché éligibles “Oui” ou “Non” sans l’instructeur INSTRUCTEUR_FB (dans les “instructeurs”)"
export async function withoutInstructeurFB() {
  const result = await getAllPsychologistList(
    requestDossiersEnInstruction
  ).catch((e) => {
    console.log(e);
    process.exit(-1);
  });

  return result.psychologists
    .filter((psy) => {
      const dossierEligibleValue = psy.annotations.find(
        (a) => a.id === DOSSIER_ELIGIBLE
      )?.stringValue;
      return (
        ["OUI", "NON"].includes(
          (dossierEligibleValue || "").toUpperCase().trim()
        ) &&
        psy.instructeurs.filter((i) => i.id === INSTRUCTEUR_FB).length === 0
      );
    })
    .map((psychologist) => {
      return psychologist.number;
    });
}

// Original request: "dossiers en instruction coché "notifiés éligibles" sans l’instructeur CPAM"
export async function withoutInstructeurCPAM() {
  const result = await getAllPsychologistList(
    requestDossiersEnInstruction
  ).catch((e) => {
    console.log(e);
    process.exit(-1);
  });

  return result.psychologists
    .filter((psy) => {
      const notificationSelectionValue = psy.annotations.find(
        (a) => a.id === NOTIFICATION_SELECTION
      )?.stringValue;
      return (
        notificationSelectionValue === 'Notifié "éligible"' &&
        psy.instructeurs.filter((i) => i.email.endsWith(EMAILS_CPAM)).length ===
          0
      );
    })
    .map((psychologist) => {
      return psychologist.number;
    });
}

export async function reportingTraitementErrone() {
  console.log("Récupération des traitements erronés");

  console.log("Récupération CPAM");
  const cpamOnlyList = await cpamOnly();
  console.log(cpamOnlyList.join("\n"));

  console.log("Récupération sélection non cochée");
  const notificationSelectionNotCheckedList =
    await notificationSelectionNotChecked();
  console.log(notificationSelectionNotCheckedList.join("\n"));

  console.log("Récupération acceptés non eligible");
  const notEligibleAcceptedList = await notEligibleAccepted();
  console.log(notEligibleAcceptedList.join("\n"));

  console.log("Récupération sans instructeur FB");
  const withoutInstructeurFBList = await withoutInstructeurFB();
  console.log(withoutInstructeurFBList.join("\n"));

  console.log("Récupération sans instructeur CPAM");
  const withoutInstructeurCPAMList = await withoutInstructeurCPAM();
  console.log(withoutInstructeurCPAMList.join("\n"));

  return sendEmailWithAttachments({
    subject: "Fichiers de suivi des traitements erronés",
    textSlices: [
      "Bonjour,",
      "Ci-joint le fichier de suivi des traitements erronés. Les trois fichiers concernent les trois demandes suivantes :",
      "1. des dossiers en construction ouverts par un instructeur CPAM exclusivement",
      "2. des dossiers tout statut confondu cochés éligibles (”OUI”) et non éligibles (”NON”) et dont la “notification de la sélection” n’a pas été cochée",
      "3. des dossiers acceptés non coché “éligible”",
      "4. des dossiers en instruction coché éligibles “Oui” ou “Non” sans l’instructeur INSTRUCTEUR_FB (dans les “instructeurs”)",
      "5. des dossiers en instruction coché éligibles “Oui” sans un instructeur CPAM (dans les “instructeurs”)",
    ],
    attachments: [
      {
        filename: `1-construction-cpam-only.csv`,
        content: Buffer.from(cpamOnlyList.join("\n")),
      },
      {
        filename: `2-tous-etat-notification-selection-vide.csv`,
        content: Buffer.from(notificationSelectionNotCheckedList.join("\n")),
      },
      {
        filename: `3-accepte-non-eligible.csv`,
        content: Buffer.from(notEligibleAcceptedList.join("\n")),
      },
      {
        filename: `4-instruction-sans-instructeur-fb.csv`,
        content: Buffer.from(withoutInstructeurFBList.join("\n")),
      },
      {
        filename: `5-instruction-sans-instructeur-cpam.csv`,
        content: Buffer.from(withoutInstructeurCPAMList.join("\n")),
      },
    ],
  });
}
