// Source: https://stackoverflow.com/questions/35756479/does-jest-support-es6-import-export
import http from "http";
import { parse, URL } from "url";

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
      resolve(false);
    }

    const options = {
      method: "HEAD",
      host: parse(url).host,
      path: parse(url).pathname,
      port: 80,
    };

    const req = http.request(options, (res) => {
      resolve(res.statusCode < 400 || res.statusCode >= 500);
    });

    req.end();
  });
}
