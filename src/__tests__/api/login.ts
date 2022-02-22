import got, { Got } from "got";
import tough from "tough-cookie";

import config from "../../services/config";

const getCsrfToken = (client: Got) =>
  client(`${process.env.NEXTAUTH_URL}/api/auth/csrf`).then(
    (response) => JSON.parse(response.body).csrfToken
  );

const login = (
  client: Got,
  csrfToken: string,
  email: string,
  password: string
) =>
  client.post(`${process.env.NEXTAUTH_URL}/api/auth/callback/credentials?`, {
    body: `csrfToken=${csrfToken}&email=${email}&password=${password}`,
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });

export const makeAuthenticatedClient = async (
  email: string,
  password: string
) => {
  const cookieJar = new tough.CookieJar();
  const client = got.extend({ cookieJar });

  const csrfToken = await getCsrfToken(client);
  await login(client, csrfToken, email, password);

  return client;
};
