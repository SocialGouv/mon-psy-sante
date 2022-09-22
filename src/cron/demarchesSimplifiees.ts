import * as Sentry from "@sentry/nextjs";
import pLimit from "p-limit";
import urlExist from "url-exist";

import { formatAdeliId } from "../services/adeli/formatAdeliId";
import { requestAdeli } from "../services/adeli/request";
import { addVerificationMessage } from "../services/demarchesSimplifiees/buildRequest";
import filterDossiersToVerif from "../services/demarchesSimplifiees/dossiers";
import {
  getDossiersInConstruction,
  getPsychologistList,
} from "../services/demarchesSimplifiees/import";
import parseDossiers from "../services/demarchesSimplifiees/parse-psychologists";
import { validatePsychologist } from "../services/demarchesSimplifiees/validate-psychologist";
import getAddressCoordinates from "../services/getAddressCoordinates";
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

export function isAdeliIdValidDepartment(
  adeliId: string,
  department: string
): boolean {
  const departmentFromAdeli = formatAdeliId(adeliId).substring(0, 2);
  switch (departmentFromAdeli) {
    case "9A":
      return department === "971";
    case "9B":
      return department === "972";
    case "9C":
      return department === "973";
    case "9D":
      return department === "974";
    case "9F":
      return department === "976";
    default:
      return departmentFromAdeli === department;
  }
}

export const validateDossier = async (
  dossier: Psychologist,
  adeliData: AdeliData[]
): Promise<string[]> => {
  let errors = [];

  if (adeliData.length === 0) {
    return [`Numéro ADELI invalide : ${dossier.adeliId}`];
  }

  if (!isAdeliIdValidDepartment(dossier.adeliId || "", dossier.department)) {
    errors.push(
      `Le numéro ADELI ${dossier.adeliId} ne correspond pas au département ${dossier.department}`
    );
  }

  const urlWithProtocol = dossier.website.startsWith("http")
    ? dossier.website
    : `https://${dossier.website}`;
  const isUrlValid = await urlExist(urlWithProtocol);
  if (!isUrlValid) {
    errors.push(`Le site web renseigné (${dossier.website}) n'est pas valide`);
  }

  const identifier = dossier.id?.toString() ?? dossier.email;
  const coordinates = await getAddressCoordinates(identifier, dossier.address);
  if (!coordinates) {
    errors.push(`Adresse principale non reconnue : ${dossier.address}`);
  }
  if (dossier.secondAddress) {
    const secondCoordinates = await getAddressCoordinates(
      identifier,
      dossier.secondAddress
    );
    if (!secondCoordinates) {
      errors.push(`Adresse secondaire non reconnue : ${dossier.secondAddress}`);
    }
  }

  const psychologistValidation = validatePsychologist(dossier, adeliData);
  if (psychologistValidation.success === false) {
    errors = errors.concat(
      psychologistValidation.error.issues.map(({ message }) => message)
    );
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

// In order to perform a local test, you have to prepare the dossier
// config.demarchesSimplifiees.writeableId on demarche simplifées website by
// emptying "Conclusions Vérifications automatiques" and changing its status
// to "En construction".
export const verifFolders = async (): Promise<void> => {
  try {
    console.log("Starting verifFolders...");

    const dossiersInConstruction = await getDossiersInConstruction();
    const dossiersToVerify = parseDossiers(
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
