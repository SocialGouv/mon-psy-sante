import "../css/style.css";

import { SkiplinkItem, Skiplinks } from "@dataesr/react-dsfr";
import * as Sentry from "@sentry/node";
import { init } from "@socialgouv/matomo-next";
import App from "next/app";
import Head from "next/head";
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
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>MonPsy</title>
          <meta property="og:title" content="MonPsy" />

          <meta
            name="description"
            content="MonPsy s’adresse à toute la population à partir de 3 ans présentant des troubles psychiques d’intensité légère à modérée. Dès avril&nbsp;2022, sur orientation d’un médecin, les patients (enfants, adolescents et adultes) pourront bénéficier de séances assurées par des psychologues volontaires conventionnés avec l’Assurance Maladie."
          />
          <meta
            property="og:description"
            content="MonPsy s’adresse à toute la population à partir de 3 ans présentant des troubles psychiques d’intensité légère à modérée. Dès avril&nbsp;2022, sur orientation d’un médecin, les patients (enfants, adolescents et adultes) pourront bénéficier de séances assurées par des psychologues volontaires conventionnés avec l’Assurance Maladie."
          />

          <meta property="og:type" content="website" />
          <script
            type="text/javascript"
            src="https://forms.sbc08.com/form.js"
          />
          <meta
            property="og:image"
            content="https://monpsy.sante.gouv.fr/images/Illustration.svg"
          />
        </Head>
        <Skiplinks>
          <SkiplinkItem href="#contenu">Contenu</SkiplinkItem>
          <SkiplinkItem href="#header-navigation">Menu</SkiplinkItem>
          <SkiplinkItem href="#footer">Pied de page</SkiplinkItem>
        </Skiplinks>
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
