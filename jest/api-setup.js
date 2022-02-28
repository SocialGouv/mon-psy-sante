// eslint-disable-next-line import/no-extraneous-dependencies
import { setup as setupDevServer } from 'jest-dev-server';

export default async () => {
  await setupDevServer({
    command: 'NODE_ENV=test npm run dev',
    launchTimeout: 50000,
    port: 3000,
    debug: true,
  });
};
