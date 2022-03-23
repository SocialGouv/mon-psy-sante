const { withSentryConfig } = require("@sentry/nextjs");

const csp = {
  "default-src": ["'self'"],
  "connect-src": [
    "'self'",
    "https://*.gouv.fr",
    "https://services.sarbacane.com",
  ],
  "font-src": ["'self'", "data:"],
  "img-src": [
    "'self'",
    "data:",
    "https://forms.sbc08.com",
    "https://*.tile.openstreetmap.org/",
  ],
  "prefetch-src": ["'self'", "https://*.gouv.fr"],
  "script-src": ["'self'", "https://*.gouv.fr", "https://*.sbc08.com"],
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
};

module.exports = {
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
  ...withSentryConfig(moduleExports, { silent: true }),
};
