import * as Sentry from "@sentry/node";
import cron from "cron";

import * as demarchesSimplifiees from "./demarchesSimplifiees";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

const jobs = [
  {
    cronTime: "*/5 * * * *",
    name: "Import latest data from DS",
    onTick: demarchesSimplifiees.importData,
    start: true,
    timeZone: "Europe/Paris",
  },
  {
    cronTime: "0 */3 * * *",
    name: "Import psychologist state from DS",
    onTick: demarchesSimplifiees.importState,
    start: true,
    timeZone: "Europe/Paris",
  },
];

jobs.forEach((job) => {
  console.log(`🚀 The job "${job.name}" is ON ${job.cronTime}`);
  new cron.CronJob(job);
});

console.log(`Started cron jobs`);
