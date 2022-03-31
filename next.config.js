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
    "https://www.ssa.gov",
  ],
  "prefetch-src": ["'self'", "https://*.gouv.fr"],
  "script-src": [
    "'self'",
    "https://*.gouv.fr",
    "https://*.sbc08.com",
    "https://www.ssa.gov",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js",
  ],
  "frame-src": ["'self'", "https://*.gouv.fr"],
  "style-src": [
    "'self'",
    "'unsafe-inline'",
    "https://www.ssa.gov/accessibility/andi/andi.css",
  ],
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
