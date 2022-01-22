import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const Directory = dynamic(() => import("../components/Directory"), {
  ssr: false,
});

const Annuaire = () => (
  <>
    <Head>
      <title>MonPsySanté - Annuaire</title>
      <link rel="stylesheet" href="/css/leaflet.css" />
      <script src="/scripts/leaflet.js" async />
    </Head>
    <div className="fr-container">
      <Directory />
    </div>
  </>
);

export default Annuaire;
