import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css";
import "../../public/css/style.css";

import * as Sentry from "@sentry/node";
import { init } from "@socialgouv/matomo-next";
import App from "next/app";
import React from "react";

import Footer from "../components/Footer";
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
      <>
        <div className="fr-skiplinks">
          <nav
            className="fr-container"
            role="navigation"
            aria-label="Accès rapide"
          >
            <ul className="fr-skiplinks__list">
              <li>
                <a className="fr-link" href="#contenu">
                  Contenu
                </a>
              </li>
              <li>
                <a className="fr-link" href="#header-navigation">
                  Menu
                </a>
              </li>
              <li>
                <a className="fr-link" href="#footer">
                  Pied de page
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <Nav />
        <div id="contenu">
          <Component {...pageProps} />
        </div>
        <Footer />
      </>
    );
  }
}

export default MyApp;
