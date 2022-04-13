import Head from "next/head";
import React from "react";

const Page = () => {
  return (
    <>
      <Head>
        <title>MonPsy pour les psychologues</title>
      </Head>
      <div className="fr-container fr-my-6w">
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
          <div id="accessibilite" className="fr-mt-3w">
            <h2>Accessibilité</h2>
            <p className="fr-mb-2w">
              <strong>Le site est non conforme avec le RGAA 4.0</strong> : le
              site n’a pas encore été audité.
            </p>
            <p className="fr-mb-2w">
              Nous souhaitons cependant qu’il soit accessible au plus grand
              nombre. Vous pouvez donc :
            </p>
            <ul>
              <li>
                changer les couleurs, les niveaux de contraste et les polices de
                caractères,
              </li>
              <li>
                zoomer jusqu’à 300% sans que le texte ne déborde de l’écran,
              </li>
              <li>
                naviguer sur la plupart des pages du site en utilisant un simple
                clavier
              </li>
              <li>
                écouter la plus grande partie du site web à l’aide d’un lecteur
                d’écran.
              </li>
            </ul>
            <p>
              Nous avons également rendu le texte du site aussi simple que
              possible à comprendre.
            </p>
            <h3>Défauts d’accessibilité</h3>
            <p>
              Nous savons que certaines parties de ce site ne sont pas
              accessibles : La carte de la page annuaire n’est pas accessible.
              La liste permet cependant d’accéder aux informations des psys
              partenaires.
            </p>
          </div>

          <div className="fr-mt-3w">
            <h2>Signaler un dysfonctionnement</h2>
            <p>
              Si vous rencontrez un défaut d’accessibilité vous empêchant
              d’accéder à un contenu ou une fonctionnalité du site, merci de
              nous en faire part. Si vous n’obtenez pas de réponse rapide de
              notre part, vous êtes en droit de faire parvenir vos doléances ou
              une demande de saisine au Défenseur des droits.
            </p>
            <p>
              En savoir plus
              <br />
              Pour en savoir plus sur la politique d’accessibilité numérique de
              l’État&nbsp;:
              <a
                href="https://www.numerique.gouv.fr/publications/rgaa-accessibilite/"
                target="_blank"
                rel="noreferrer"
              >
                numerique.gouv.fr/publications/rgaa-accessibilite
              </a>
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
