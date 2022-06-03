import * as Sentry from "@sentry/nextjs";

import * as demarchesSimplifiees from "./demarchesSimplifiees";
import { sendReporting } from "./sendReporting";

const runJob = async (job): Promise<void> => {
  const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
  const SENTRY_ENV = process.env.NEXT_PUBLIC_SENTRY_ENV;

  console.log(`Initializing Sentry with url: ${SENTRY_DSN}`);
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV ?? "development",
  });

  await job();
  process.exit(0);
};

if (process.argv.length < 3) {
  console.log("Please specify the cron you want to launch:");
  console.log("ts-node src/cron/launch.ts job_name");
  process.exit(1);
}

const cronJobs = {
  importFromDS: demarchesSimplifiees.importFromDS,
  verifFolders: demarchesSimplifiees.verifFolders,
  sendReporting,
};

const jobName = process.argv[2];
const job = cronJobs[jobName];
if (job) {
  runJob(job);
} else {
  console.log(`The job ${process.argv[2]} does not exist !`);
  process.exit(2);
}
