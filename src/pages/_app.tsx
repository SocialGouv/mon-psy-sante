import "@socialgouv/bootstrap.core/dist/socialgouv-bootstrap.min.css";
import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css";
import "../css/style.css";

import * as Sentry from "@sentry/node";
import { init } from "@socialgouv/matomo-next";
import App from "next/app";
import React from "react";

import Nav from "../components/Nav";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

class MyApp extends App {
  componentDidMount() {
    init({ siteId: MATOMO_SITE_ID, url: MATOMO_URL });
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Nav />
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}

export default MyApp;
