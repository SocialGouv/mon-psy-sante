import * as Sentry from "@sentry/nextjs";

import { models } from "../db/models";
import {
  getPsychologistFromListIds,
  getPsychologistList,
  getPsychologistState,
} from "../services/demarchesSimplifiees/import";
import {
  countAll,
  filterIdsNotInDb,
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
    const latestCursor = await models.DSCursor.findOne({
      raw: true,
      where: { id: 1 },
    });

    //@ts-ignore
    const dsAPIData = await getPsychologistList(latestCursor.cursor);
    console.log(dsAPIData);
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
