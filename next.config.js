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

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  disableClientWebpackPlugin: true,
  disableServerWebpackPlugin: true,
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
