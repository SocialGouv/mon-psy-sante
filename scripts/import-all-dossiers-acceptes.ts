import { getPsychologistList } from "../src/services/demarchesSimplifiees/import";
import { saveMany } from "../src/services/psychologists";

(async () => {
  try {
    console.log("Starting importData all data...");

    //@ts-ignore
    const dsAPIData = await getPsychologistList();
    console.log(dsAPIData.psychologists[0]);
    if (dsAPIData.psychologists.length > 0) {
      await saveMany(dsAPIData.psychologists);
      console.log(`${dsAPIData.psychologists.length} saved`);
    }

    console.log(`Import done`);
  } catch (err) {
    console.error("ERROR: Could not import DS API data to PG", err);
  }
})();
