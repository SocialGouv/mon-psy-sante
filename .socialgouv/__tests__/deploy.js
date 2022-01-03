import util from "util";
import { directory } from "tempy";
import { project } from "@socialgouv/kosko-charts/testing/fake/github-actions.env";

const exec = util.promisify(require("child_process").exec);

jest.setTimeout(1000 * 60);

test("deploy dev 2", async () => {
  const dir = directory();
  const env = project("monpsy").prod;

  env.SOCIALGOUV_CONFIG_PATH = `${dir}/autodevops/config.json`;

  Object.assign(process.env, env);

  const cmd = `
    npx degit SocialGouv/kosko-charts/templates/autodevops ${dir}/autodevops; \
    yarn --cwd ${dir}/autodevops --silent; \
    cp -r ${__dirname}/../environments ${__dirname}/../config.json ${dir}/autodevops/; \
    yarn --cwd ${dir}/autodevops --silent generate --env prod 
  `;

  const { stdout: manifest } = await exec(cmd, { env: process.env });

  expect(manifest).toMatchSnapshot();
});
