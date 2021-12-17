import Head from "next/head";
import React from "react";

export default function Custom404() {
  return (
    <React.Fragment>
      <Head>
        <title>Page non trouvée | MonPsySanté</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <h1>404 - Page non trouvée</h1>
      </div>
    </React.Fragment>
  );
}
