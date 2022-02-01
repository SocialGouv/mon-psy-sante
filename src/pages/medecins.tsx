import Head from "next/head";
import React from "react";

const Page = () => {
  return (
    <>
      <Head>
        <title>MonPsy pour les médecins</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <h1>Je suis médecin</h1>
        <p className="fr-text--lead">
          Je souhaite m’informer sur le dispositif
        </p>
      </div>
    </>
  );
};
export default Page;
