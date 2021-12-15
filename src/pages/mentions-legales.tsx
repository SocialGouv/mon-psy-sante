import Head from "next/head";
import React from "react";

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Données personnelles et gestion des cookies | MonPsySanté</title>
    </Head>
    <div className="fr-container fr-my-5w">
      <h1 id="mentions-legales">Mentions légales</h1>
      <div>
        <div className="fr-mt-3w">
          <h2>Éditeur de la Plateforme</h2>
          <p>
            La Plateforme est éditée par la Fabrique des Ministères sociaux
            situé :
          </p>
          <p className="fr-mb-2w">
            La Plateforme MonPsySanté est éditée par{" "}
            <a
              href="https://fabrique.social.gouv.fr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fabrique des Ministères sociaux
            </a>{" "}
            situé :
          </p>
          <address className="fr-mb-2w">
            Tour Mirabeau 39-43
            <br />
            Quai André Citroën
            <br />
            75015 PARIS
          </address>
        </div>
        <div className="fr-mt-3w">
          <h2>Directeur de la publication</h2>
          <p className="fr-mb-2w">
            <a
              href="https://solidarites-sante.gouv.fr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ministère des Solidarités et de la Santé
            </a>
          </p>
          <p className="fr-mb-2w">14 av Duquesne Paris 75007</p>
        </div>
        <div className="fr-mt-3w">
          <h2>Hébergement de la Plateforme</h2>
          Ce site est hébergé par Microsoft Azure France (région France centre)
          : Microsoft France 37 Quai du Président Roosevelt 92130
          ISSY-LES-MOULINEAUX.
        </div>
        <div id="accessibilite" className="fr-mt-3w">
          <h2>Accessibilité</h2>
          <p className="fr-mb-2w">
            La conformité aux normes d’accessibilité numérique est un objectif
            ultérieur. En attendant, nous tâchons de rendre ce site accessible à
            toutes et à tous :
          </p>
          <ul className="fr-list">
            <li>
              Utilisation de composants accessibles (design system de l’État)
            </li>
            <li>Respect des bonnes pratiques (Pilida, Opquast...)</li>
            <li>Tests manuels</li>
          </ul>
        </div>
        <div className="fr-mt-2w">
          <h3>En savoir plus</h3>
          Pour en savoir plus sur la politique d’accessibilité numérique de
          l’État :
          <a href="http://references.modernisation.gouv.fr/accessibilite-numerique">
            http://references.modernisation.gouv.fr/accessibilite-numerique
          </a>
        </div>
        <div className="fr-mt-3w">
          <h2>Sécurité</h2>
          Le site est protégé par un certificat électronique, matérialisé pour
          la grande majorité des navigateurs par un cadenas. Cette protection
          participe à la confidentialité des échanges. En aucun cas les services
          associés à la plateforme ne seront à l’origine d’envoi de courriels
          pour demander la saisie d’informations personnelles.
        </div>
      </div>
    </div>
  </React.Fragment>
);
export default Page;
