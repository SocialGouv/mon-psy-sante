const nextSourceMaps = require("@zeit/next-source-maps");
const { withSentryConfig } = require("@sentry/nextjs");

const csp = {
  'default-src': ["'none'"],
  'connect-src': ["'self'", "https://*.gouv.fr", "https://services.sarbacane.com"],
  'font-src': ["'self'", "data:"],
  'img-src': ["'self'",  "data:", "https://forms.sbc08.com"],
  'prefetch-src': ["'self'", "https://*.gouv.fr"],
  'script-src': ["'self'", "https://*.gouv.fr", "https://*.sbc08.com"],
  'frame-src': ["'self'", "https://*.gouv.fr"],
  'style-src': ["'self'", "'unsafe-inline'"]
}

// In dev we allow 'unsafe-eval', so HMR doesn't trigger the CSP
if (process.env.NODE_ENV !== 'production') {
  csp['script-src'].push("'unsafe-eval'");
}

module.exports = withSentryConfig(
  nextSourceMaps({
    // by default, sentry tries to upload sourcemaps at build time
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#configure-source-maps
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
          source: '/:path*',
          headers: [{
						key: "Content-Security-Policy",
						value: Object.keys(csp).map(key => `${key} ${csp[key].join(" ")}`).join(";")
					}],
        },
      ]
    },  })
);
