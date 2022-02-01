import Head from "next/head";
import React from "react";

import Directory from "../components/Directory";

const Annuaire = () => (
  <>
    <Head>
      <title>MonPsy - Annuaire</title>
    </Head>
    <div className="fr-container">
      <Directory />
    </div>
  </>
);

export default Annuaire;
