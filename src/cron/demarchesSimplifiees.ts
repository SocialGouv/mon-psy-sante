import * as Sentry from "@sentry/nextjs";

import { models } from "../db/models";
import { requestAdeli } from "../services/adeli/request";
import { addVerificationMessage } from "../services/demarchesSimplifiees/buildRequest";
import filterDossiersToVerif from "../services/demarchesSimplifiees/dossiers";
import {
  getDossiersInConstruction,
  getPsychologistFromListIds,
  getPsychologistList,
  getPsychologistState,
} from "../services/demarchesSimplifiees/import";
import parsePsychologists from "../services/demarchesSimplifiees/parse-psychologists";
import { validatePsychologist } from "../services/demarchesSimplifiees/validate-psychologist";
import {
  countAll,
  filterIdsNotInDb,
  saveMany,
  updateState,
} from "../services/psychologists";
import { AdeliData } from "../types/adeli";
import { Psychologist } from "../types/psychologist";

async function logPsyNumber(): Promise<void> {
  const count = await countAll();
  console.log("Psy in DB: ", count);
}

export const importData = async (): Promise<void> => {
  try {
    console.log("Starting importData...");
    await logPsyNumber();
    const latestCursor = await models.DSCursor.findOne({
      raw: true,
      where: { id: 1 },
    });

    //@ts-ignore
    const dsAPIData = await getPsychologistList(latestCursor.cursor);
    if (dsAPIData.psychologists.length > 0) {
      await saveMany(dsAPIData.psychologists);
      console.log(`${dsAPIData.psychologists.length} saved`);
      await models.DSCursor.update(
        {
          cursor: dsAPIData.lastCursor,
        },
        { where: { id: 1 } }
      );
      console.log(`New cursor ${dsAPIData.lastCursor} saved`);
    }

    console.log(`Import done`);
    await logPsyNumber();
  } catch (err) {
    Sentry.captureException(err);
    console.error("ERROR: Could not import DS API data to PG", err);
  }
};

export const importState = async (): Promise<void> => {
  try {
    console.log("Starting importState.");
    await logPsyNumber();

    const dsAPIData = await getPsychologistState();

    await updateState(dsAPIData);
    const missingPsy: number[] = await filterIdsNotInDb(
      dsAPIData.filter((psy) => psy.state === "accepte")
    );
    if (missingPsy.length) {
      const missingPsyData = await getPsychologistFromListIds(missingPsy);
      await saveMany(missingPsyData);
      console.log(`Added ${missingPsy.length} missing psys`);
    }
    console.log(`importState done.`);
    await logPsyNumber();
  } catch (err) {
    Sentry.captureException(err);
    console.error("ERROR importState: ", err);
  }
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

export const verifFolders = async (): Promise<void> => {
  try {
    console.log("Starting verifFolders...");

    const dossiersInConstruction = await getDossiersInConstruction();
    const dossiersToVerify = await parsePsychologists(
      filterDossiersToVerif(dossiersInConstruction)
    );

    await Promise.all(
      dossiersToVerify.map(async (dossier) => {
        const adeliData = await requestAdeli(dossier.adeliId);

        const errors = await validateDossier(dossier, adeliData);

        const validationDate = Intl.DateTimeFormat("fr-FR").format(new Date());
        const validationText =
          errors.length === 0
            ? `Validation auto OK : ${validationDate}`
            : `Validation auto erreur : ${validationDate}\n`.concat(
                ...errors.map((error) => `- ${error} \n`)
              );

        await addVerificationMessage(
          dossier.demarcheSimplifieesId,
          validationText
        );
      })
    );

    console.log("verifFolders done");
  } catch (err) {
    Sentry.captureException(err);
    console.error("ERROR: Could verify dossiers from DS", err);
  }
};
