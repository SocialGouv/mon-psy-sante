/* eslint-disable no-process-exit */

import fs from "fs";
import _ from "lodash";

import { countAll, getAll } from "../src/services/psychologists";

fs.createWriteStream("emails-monsoutienpsy-acceptes.csv");

let output = '"Email";"FirstName";"LastName"\n';
(async () => {
  const count = await countAll();
  console.log(`Fetching ${count} psy`);
  const psychologists = await getAll({
    pagesize: count.toString(),
    pageindex: "0",
  }).catch((e) => {
    console.log("Error while fetching psy: ", e);
    process.exit(-1);
  });
  const accepte = psychologists.map((item) => {
    return `"${item.email}";"${item.firstName}";"${item.lastName}"`;
  });

  output += _.uniq(accepte).join("\n");
  if (psychologists.length !== _.uniq(accepte).length) {
    console.log("!!!! some emails are not uniqs");
  }

  fs.writeFileSync("emails-monsoutienpsy-acceptes.csv", output);

  console.log("Nombre total de dossier en accepté", accepte.length);

  setTimeout(() => {
    process.exit();
  }, 200);
})();
