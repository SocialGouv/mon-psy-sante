import fs from "fs";
import _ from "lodash";

import {requestPsychologistsState} from "../src/services/demarchesSimplifiees/buildRequest";
import {getAllPsychologistList} from "../src/services/demarchesSimplifiees/import";
import {DEPARTMENTS} from "../src/types/enums/department";

const file = fs.createWriteStream("departments-stats.csv");

const extractDepNumber = (dep) => dep.split(" - ")[0];

const deps = DEPARTMENTS.map((dep) => {
  return {count: 0, name: dep, department: extractDepNumber(dep)};
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
  const requestPsychologistsStateWithDep = _.bind(
    requestPsychologistsState,
    null,
    _,
    `groupeInstructeur {
        label
     }`
  );
  const result = await getAllPsychologistList(
    requestPsychologistsStateWithDep
  ).catch((e) => {
    console.log(e);
    process.exit(-1);
  });

  const psychologists = result.psychologists;
  console.log(psychologists[0]);
  const sansSuite = _.filter(psychologists, {state: "sans_suite"});
  const refuse = _.filter(psychologists, {state: "refuse"});

  const valids = _.reject(
    _.reject(_.reject(psychologists, {state: "refuse"}), {
      state: "sans_suite",
    }),
    {archived: true}
  );

  valids.forEach((psy) => {
    const dep = _.find(deps, {
      department: extractDepNumber(psy.groupeInstructeur.label),
    });
    if (!dep) console.log(">>>>>>>>>", psy.groupeInstructeur.label);
    dep.count++;
  });

  const enInstruction = _.filter(valids, {state: "en_instruction"});
  const enConstruction = _.filter(valids, {state: "en_construction"});
  const accepte = _.filter(valids, {state: "accepte"});
  const noDossier = _.filter(deps, {count: 0});

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
