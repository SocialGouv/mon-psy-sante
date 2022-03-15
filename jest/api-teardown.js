// eslint-disable-next-line import/no-extraneous-dependencies
import { teardown as teardownDevServer } from 'jest-dev-server';

module.exports = async function globalTeardown() {
  await teardownDevServer();
};
