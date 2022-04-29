import * as Sentry from "@sentry/nextjs";

import { getPsychologistList } from "../services/demarchesSimplifiees/import";
import {
  countAll,
  getDateLatestAccepte,
  getDateLatestArchived,
  saveMany,
  updateState,
} from "../services/psychologists";

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
