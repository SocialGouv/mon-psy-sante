const fs = require("fs");
const _ = require("lodash");
const { getAll, countAll } = require("../src/services/psychologists");

const file = fs.createWriteStream("departments-stats.csv");
import { DEPARTMENTS } from "../src/types/enums/department";

const deps = DEPARTMENTS.map((dep) => {
  return { count: 0, name: dep, department: dep.split(" - ")[0] };
});

function log(text, count) {
  file.write(`"${text}";${count}\n`);
  console.log(text, ":", count);
}

function displayList(list) {
  list.forEach((item) => {
    log(item.name, item.count);
  });
}

log("Dep", "total");
(async () => {
  const count = await countAll();
  console.log(`Fetching ${count} psy`);
  const psychologists = await getAll({ pagesize: count, pageindex: 0 }).catch(
    (e) => {
      console.log("Error while fetching psy: ", e);
      process.exit(-1);
    }
  );
  console.log(psychologists[0]);
  const sansSuite = _.filter(psychologists, { state: "sans_suite" });
  const refuse = _.filter(psychologists, { state: "refuse" });

  const valids = _.reject(
    _.reject(_.reject(psychologists, { state: "refuse" }), {
      state: "sans_suite",
    }),
    { archived: true }
  );

  valids.forEach((psy) => {
    const dep = _.find(deps, { department: psy.department });
    if (!dep) console.log(">>>>>>>>>", psy.department);
    dep.count++;
  });

  const enInstruction = _.filter(valids, { state: "en_instruction" });
  const enConstruction = _.filter(valids, { state: "en_construction" });
  const accepte = _.filter(valids, { state: "accepte" });
  const noDossier = _.filter(deps, { count: 0 });

  displayList(deps);

  log("", "");
  log("Nombre total de dossier déposés", psychologists.length);
  log("Nombre total de dossier sans suite", sansSuite.length);
  log("Nombre total de dossier refusés", refuse.length);
  log("Nombre total de dossier en instruction", enInstruction.length);
  log("Nombre total de dossier en construction", enConstruction.length);
  log("Nombre total de dossier acceptés", accepte.length);
  log("Nombre de départements sans dossiers", noDossier.length);

  setTimeout(() => {
    process.exit();
  }, 200);
})();
