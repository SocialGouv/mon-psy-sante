import * as Sentry from "@sentry/nextjs";
import pLimit from "p-limit";

import { requestAdeli } from "../services/adeli/request";
import { addVerificationMessage } from "../services/demarchesSimplifiees/buildRequest";
import filterDossiersToVerif from "../services/demarchesSimplifiees/dossiers";
import {
  getDossiersInConstruction,
  getPsychologistList,
} from "../services/demarchesSimplifiees/import";
import parsePsychologists from "../services/demarchesSimplifiees/parse-psychologists";
import { validatePsychologist } from "../services/demarchesSimplifiees/validate-psychologist";
import {
  countAll,
  getDateLatestAccepte,
  getDateLatestArchived,
  saveMany,
  updateState,
} from "../services/psychologists";
import { AdeliData } from "../types/adeli";
import { Psychologist } from "../types/psychologist";

const limit = pLimit(5);

async function logPsyNumber(): Promise<void> {
  const count = await countAll();
  console.log("Psy in DB: ", count);
}

export const importData = async (): Promise<void> => {
  try {
    console.log("Starting importData...");
    await logPsyNumber();

    const date = await getDateLatestAccepte();
    //@ts-ignore
    const dsAPIData = await getPsychologistList(date, "state: accepte");
    if (dsAPIData.psychologists.length > 0) {
      await saveMany(dsAPIData.psychologists);
      console.log(`${dsAPIData.psychologists.length} saved`);
    }

    console.log(`Import done`);
    await logPsyNumber();
  } catch (err) {
    Sentry.captureException(err);
    console.error("ERROR: Could not import DS API data to PG", err);
  }
};

export const importArchived = async (): Promise<void> => {
  try {
    console.log("Starting importArchived.");
    await logPsyNumber();

    const date = await getDateLatestArchived();
    //@ts-ignore
    const dsAPIData = await getPsychologistList(date, "archived: true");
    if (dsAPIData.psychologists.length > 0) {
      await updateState(dsAPIData.psychologists);
      console.log(`${dsAPIData.psychologists.length} saved`);
    }

    console.log(`importArchived done.`);
    await logPsyNumber();
  } catch (err) {
    Sentry.captureException(err);
    console.error("ERROR importArchived: ", err);
  }
};

export const importFromDS = async (): Promise<void> => {
  await importData();
  await importArchived();
};

const validateDossier = async (
  dossier: Psychologist,
  adeliData: AdeliData[]
): Promise<string[]> => {
  let errors = [];

  if (adeliData.length === 0) {
    return [`Numéro ADELI invalide : ${dossier.adeliId}`];
  }

  const psychologistValidation = validatePsychologist(dossier, adeliData);

  if (psychologistValidation.success === false) {
    errors = errors.concat(
      psychologistValidation.error.issues.map(({ message }) => message)
    );
  }

  if (!dossier.coordinates) {
    errors = errors.concat([
      `Adresse principale non reconnue : ${dossier.address}`,
    ]);
  }

  if (dossier.secondAddress && !dossier.secondAddressCoordinates) {
    errors = errors.concat([
      `Adresse secondaire non reconnue : ${dossier.secondAddress}`,
    ]);
  }

  return errors;
};

const verifyDossier = async (dossier: Psychologist): Promise<void> => {
  const adeliData = await requestAdeli(dossier.adeliId);

  const errors = await validateDossier(dossier, adeliData);

  const validationDate = Intl.DateTimeFormat("fr-FR").format(new Date());
  const validationText =
    errors.length === 0
      ? `Validation auto OK : ${validationDate}`
      : `Validation auto erreur : ${validationDate}\n`.concat(
          ...errors.map((error) => `- ${error} \n`)
        );
  return await addVerificationMessage(
    dossier.demarcheSimplifieesId,
    validationText
  );
};

export const verifFolders = async (): Promise<void> => {
  try {
    console.log("Starting verifFolders...");

    const dossiersInConstruction = await getDossiersInConstruction();
    const dossiersToVerify = await parsePsychologists(
      filterDossiersToVerif(dossiersInConstruction)
    );

    console.log(`Verifying ${dossiersToVerify.length} dossiers`);
    await Promise.all(
      dossiersToVerify.map(async (dossier) =>
        limit(() => verifyDossier(dossier))
      )
    );

    console.log("verifFolders done");
  } catch (err) {
    Sentry.captureException(err);
    console.error("ERROR: Could verify dossiers from DS", err);
  }
};
