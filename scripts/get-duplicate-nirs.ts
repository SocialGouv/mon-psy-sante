import { getNIRs } from "../src/services/demarchesSimplifiees/import";

(async () => {
  const { NIRs } = await getNIRs();
  const lookup = NIRs.reduce((a, e) => {
    a[e.champs[0].stringValue] = ++a[e.champs[0].stringValue] || 0;
    return a;
  }, {});
  const duplicates = NIRs.filter((e) => lookup[e.champs[0].stringValue]);
  console.log("List of duplicates NIR:");
  for (const duplicate of duplicates) {
    console.log(
      "NIR",
      duplicate.champs[0].stringValue,
      "dossier",
      duplicate.number
    );
  }
})();
