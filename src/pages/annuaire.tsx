import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";
import React from "react";

import HeadTag from "../components/HeadTag";

const Directory = dynamic(() => import("../components/Directory/index"), {
  ssr: false,
});

const Annuaire = () => (
  <>
    <Head>
      <link rel="stylesheet" href="/css/leaflet.css" />
      <meta name="robots" content="noindex" />
    </Head>
    <Script src="/scripts/leaflet.js" async />
    <HeadTag
      title="Annuaire des psychologues partenaires | ParcoursPsy"
      description="Accéder rapidement aux coordonnées des psychologues partenaires du dispositif ParcoursPsy."
    />
    <div className="fr-container-fluid">
      <Directory />
    </div>
  </>
);

export default Annuaire;
