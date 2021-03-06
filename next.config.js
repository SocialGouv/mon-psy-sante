const { withSentryConfig } = require("@sentry/nextjs");
const csp = {
  "default-src": ["'self'"],
  "connect-src": ["'self'", "https://*.gouv.fr"],
  "font-src": ["'self'", "data:"],
  "img-src": ["'self'", "data:", "https://*.tile.openstreetmap.org/"],
  "prefetch-src": ["'self'", "https://*.gouv.fr"],
  "script-src": ["'self'", "https://*.gouv.fr"],
  "frame-src": ["'self'", "https://*.gouv.fr"],
  "style-src": ["'self'", "'unsafe-inline'"],
};

// In dev we allow 'unsafe-eval', so HMR doesn't trigger the CSP
if (process.env.NODE_ENV !== "production") {
  csp["script-src"].push("'unsafe-eval'");
}
const moduleExports = {
  reactStrictMode: true,
  sentry: {
    disableClientWebpackPlugin: true,
    disableServerWebpackPlugin: true,
  },
  webpack: (config, { isServer /*, buildId */ }) => {
    if (!isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: Object.keys(csp)
              .map((key) => `${key} ${csp[key].join(" ")}`)
              .join(";"),
          },
        ],
      },
    ];
  },
};

module.exports = withSentryConfig(moduleExports, { silent: true });
