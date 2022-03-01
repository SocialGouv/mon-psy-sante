import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

import HeadTag from "../components/HeadTag";

const Directory = dynamic(() => import("../components/Directory/index"), {
  ssr: false,
});

const Annuaire = () => (
  <>
    <Head>
      <link rel="stylesheet" href="/css/leaflet.css" />
      <script src="/scripts/leaflet.js" async />
      <meta name="robots" content="noindex" />
    </Head>
    <HeadTag
      title="Annuaire des psychologues partenaires | MonPsy"
      description="Accéder rapidement aux coordonnées des psychologues partenaires du dispositif MonPsy."
    />
    <div className="fr-container">
      <Directory />
    </div>
  </>
);

export default Annuaire;
