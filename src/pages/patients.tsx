import Head from "next/head";
import React from "react";

const Page = () => {
  return (
    <>
      <Head>
        <title>MonPsySanté pour les patients</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <h1>Je suis patient</h1>
        <p className="fr-text--lead">Je souhaite consulter un psychologue</p>
        <div>
          <div className="fr-mt-3w">
            <h2>Comment ça marche ?</h2>

            <p>
              <strong className="fr-text--lead">1. </strong>
              Mon médecin m’a conseillé d’aller consulter un psychologue et m’a
              remis un courrier d’adressage que je devrais présenter.
            </p>
            <p>
              <strong className="fr-text--lead">2. </strong>
              Je prends rendez-vous avec un psychologue de l’annuaire
              MonPsySanté, psychologue partenaire conventionné par l’Assurance
              Maladie.
            </p>
            <p>
              <strong className="fr-text--lead">3. </strong>
              Je consulte le psychologue jusqu’à 8 séances, dont une première
              pour faire le point. J’avance les frais de chaque séance.
            </p>
            <p>
              <strong className="fr-text--lead">4. </strong>
              Je suis remboursé par l’Assurance Maladie pour chaque séance. (et
              ma mutuelle ?).
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
