// Todo: rename this file to reportingDepartment.ts (we have to rename in cron and delete previous cron).
import * as Sentry from "@sentry/nextjs";
import _ from "lodash";

import { requestPsychologistsState } from "../services/demarchesSimplifiees/buildRequest";
import { getAllPsychologistList } from "../services/demarchesSimplifiees/import";
import { DEPARTMENTS } from "../types/enums/department";
import { sendEmailWithAttachments } from "./cronUtils";

export async function reporting() {
  const data = [];

  const extractDepNumber = (dep) => dep.split(" - ")[0];
  const deps = DEPARTMENTS.map((dep) => {
    return {
      count: 0,
      countAcceptes: 0,
      name: dep,
      department: extractDepNumber(dep),
    };
  });

  function log(text, count, countAcceptes = "") {
    console.log(text, ":", count, countAcceptes);
    data.push(`"${text}";${count};${countAcceptes}\n`);
  }

  log("Dep", "Total", "Acceptés");
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
  ).catch((err) => {
    Sentry.captureException(err);
    console.error("ERROR reportingStatsByDepartment: ", err);
    process.exit(-1);
  });

  const psychologists = result.psychologists;
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
    const dep = _.find(deps, {
      department: extractDepNumber(psy.groupeInstructeur.label),
    });
    if (!dep) console.log(">>>>>>>>>", psy.groupeInstructeur.label);
    dep.count++;
    if (psy.state === "accepte") dep.countAcceptes++;
  });

  const enInstruction = _.filter(valids, { state: "en_instruction" });
  const enConstruction = _.filter(valids, { state: "en_construction" });
  const accepte = _.filter(valids, { state: "accepte" });
  const noDossier = _.filter(deps, { count: 0 });
  const noDossierAcceptes = _.filter(deps, { countAcceptes: 0 });

  deps.forEach((item) => {
    log(item.name, item.count, String(item.countAcceptes));
  });

  log("", "");
  log("Nombre total de dossier déposés", psychologists.length);
  log("Nombre total de dossier sans suite", sansSuite.length);
  log("Nombre total de dossier refusés", refuse.length);
  log("Nombre total de dossier en instruction", enInstruction.length);
  log("Nombre total de dossier en construction", enConstruction.length);
  log("Nombre total de dossier acceptés", accepte.length);
  log("Nombre de départements sans dossiers", noDossier.length);
  log(
    "Nombre de départements sans dossiers acceptés",
    noDossierAcceptes.length
  );

  return Buffer.from(data.join(""));
}

export async function reportingStatsByDepartment() {
  return sendEmailWithAttachments({
    subject: "Statistiques par département",
    textSlices: ["Bonjour,", "Ci-joint les statistiques par département."],
    attachments: [
      {
        filename: "statistiques.csv",
        content: await reporting(),
      },
    ],
  });
}
