import { models } from "../db/models";
import { getPsychologistList } from "../services/demarchesSimplifiees/import";
import { saveMany } from "../services/psychologists";

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

      console.log(`{$psychologists.psychologists.length} downloaded`);
    } else {
      console.log("No psychologists to save");
    }

    console.log("importData done");
  } catch (err) {
    console.error("ERROR: Could not import DS API data to PG", err);
  }
};
