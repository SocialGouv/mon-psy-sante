// Source: https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export
import http from "http";
import { URL } from "url";

// https://github.com/sindresorhus/is-url-superb/blob/main/index.js
function isUrl(str: string): boolean {
  if (typeof str !== "string") {
    return false;
  }

  const trimmedStr = str.trim();
  if (trimmedStr.includes(" ")) {
    return false;
  }

  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

// https://github.com/Richienb/url-exist/blob/master/index.js
export function urlExists(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!isUrl(url)) {
      return resolve(false);
    }

    const { host, pathname } = new URL(url.trim());

    const options = {
      method: "HEAD",
      host,
      path: pathname,
      timeout: 2000,
    };

    const req = http.request(options, (res) => {
      resolve(res.statusCode < 400 || res.statusCode >= 500);
    });
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}
