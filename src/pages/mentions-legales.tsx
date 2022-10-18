import Head from "next/head";
import React from "react";

import Breadcrumb from "../components/Breadcrumb";

const Page = () => {
  return (
    <>
      <Head>
        <title>Mentions légales | MonPsy</title>
      </Head>
      <div className="fr-container fr-mb-6w">
        <Breadcrumb page="Mentions légales" />

        <h1 id="mentions-legales">Mentions légales</h1>
        <div>
          <div className="fr-mt-3w">
            <h2>Éditeur</h2>
            <p className="fr-mb-0">
              Ce site est édité par la Direction de la Sécurité Sociale:
            </p>
            <address className="fr-mb-2w">
              14 avenue Duquesne <br />
              75007 Paris <br />
              Téléphone: 01 40 56 60 00
            </address>
          </div>
          <div className="fr-mt-3w">
            <h2>Directeur de la publication</h2>
            <p className="fr-mb-2w">Monsieur Franck VON LENNEP, Directeur</p>
          </div>
          <div className="fr-mt-3w">
            <h2>Hébergement du site</h2>
            Ce site est hébergé par&nbsp;: <br />
            <p className="fr-mb-2w">
              Microsoft Azure <br />
              37 Quai du Président Roosevelt <br />
              92130 Issy-les-Moulineaux
            </p>
          </div>

          <div className="fr-mt-3w">
            <h2>Sécurité</h2>
            <p>
              Le site est protégé par un certificat électronique, matérialisé
              pour la grande majorité des navigateurs par un cadenas. Cette
              protection participe à la confidentialité des échanges. En aucun
              cas les services associés à la plateforme ne seront à l’origine
              d’envoi de courriels pour demander la saisie d’informations
              personnelles.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
