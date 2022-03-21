import * as Sentry from "@sentry/nextjs";

import { models } from "../db/models";
import {
  getPsychologistList,
  getPsychologistState,
} from "../services/demarchesSimplifiees/import";
import { saveMany, updateState } from "../services/psychologists";

export const importData = async (): Promise<void> => {
  try {
    console.log("Starting importData...");
    const latestCursor = await models.DSCursor.findOne({
      raw: true,
      where: { id: 1 },
    });

    //@ts-ignore
    const dsAPIData = await getPsychologistList(latestCursor.cursor);

    if (dsAPIData.psychologists.length > 0) {
      await saveMany(dsAPIData.psychologists);
      await models.DSCursor.update(
        {
          cursor: dsAPIData.lastCursor,
        },
        { where: { id: 1 } }
      );

      console.log(`${dsAPIData.psychologists.length} downloaded`);
    } else {
      console.log("No psychologists to save");
    }

    console.log("importData done");
  } catch (err) {
    Sentry.captureException(err);
    console.error("ERROR: Could not import DS API data to PG", err);
  }
};

export const importState = async (): Promise<void> => {
  try {
    console.log("Starting importState...");

    const dsAPIData = await getPsychologistState();

    await updateState(dsAPIData);
    console.log("importState done");
  } catch (err) {
    Sentry.captureException(err);
    console.error("ERROR: Could not import DS API state to PG", err);
  }
};
