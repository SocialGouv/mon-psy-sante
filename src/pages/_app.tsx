import "@gouvfr/dsfr/dist/dsfr/dsfr.min.css";
import "../../public/css/style.css";

import { SkiplinkItem, Skiplinks } from "@dataesr/react-dsfr";
import * as Sentry from "@sentry/node";
import { init } from "@socialgouv/matomo-next";
import App from "next/app";
import { SessionProvider } from "next-auth/react";
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
    const {
      Component,
      pageProps: { session, ...pageProps },
    } = this.props;

    return (
      <>
        <Skiplinks>
          <SkiplinkItem href="#contenu">Contenu</SkiplinkItem>
          <SkiplinkItem href="#header-navigation">Menu</SkiplinkItem>
          <SkiplinkItem href="#footer">Pied de page</SkiplinkItem>
        </Skiplinks>
        <Nav />
        <div id="contenu">
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </div>
        <Footer />
      </>
    );
  }
}

export default MyApp;
