import Head from "next/head";
import React from "react";

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Données personnelles et gestion des cookies | MonPsySanté</title>
    </Head>
    <div className="fr-container fr-my-6w">
      <h1>Données personnelles et gestion des cookies MonPsySanté</h1>
      <h2>Cookies et traceurs</h2>
      <p>
        A titre d’information, nous utilisons Matomo un outil libre qui ne
        collecte que des informations anonymisées et paramétré pour être en
        conformité avec les recommandations de la CNIL. Cela signifie que votre
        adresse IP, par exemple, est anonymisée avant l’enregistrement. Il est
        donc impossible d’associer vos visites sur ce site à votre personne.
      </p>

      <h2 id="mention-donnees-perso">Mention Données personnelles</h2>

      <h3>Responsable de traitements</h3>

      <p>
        « MonPsySanté » est développé au sein de l’incubateur BetaGouv et porté
        par la Direction interministérielle du numérique (DINUM).
      </p>

      <h3>Finalités du traitement</h3>

      <p>
        L’objectif de l’application est de constituer une première réponse
        d’urgence à la souffrance psychique des enfants et adolescents.
      </p>

      <h3> Données et base juridique du traitement</h3>

      <p>
        Vos coordonnées mail sont traitées conformément aux missions d’intérêt
        public du ministère des solidarités et de la santé et notamment l’accès
        et la diffusion, auprès des personnes nécessitant des soins
        psychologiques, et de leurs représentants légaux, d’un annuaire de
        psychologues au profil authentifié.
      </p>

      <h3>Durée de conservation des données</h3>

      <p>
        MonPsySanté conserve et diffuse vos données à caractère personnel
        jusqu’à ce que vous vous opposiez ou, le cas échéant, aussi longtemps
        que vous êtes psychologue.
      </p>

      <h3>Droits de la personne concernée</h3>

      <p className="fr-mb-0">
        Vous disposez des droits suivants concernant vos données à caractère
        personnel :
      </p>
      <ul>
        <li>Droit d’information et droit d’accès aux données</li>
        <li>Droit de rectification ;</li>
        <li>Droit de limitation et droit d’opposition.</li>
      </ul>

      <p>
        En raison de l’obligation de sécurité et de confidentialité dans le
        traitement des données à caractère personnel qui incombe au responsable
        de traitement, votre demande ne sera traitée que si vous apportez la
        preuve de votre identité.
      </p>
      <p>
        Pour vous aider dans votre démarche, vous trouverez
        <a
          href="https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces"
          target="_blank"
          rel="noreferrer"
        >
          ici
        </a>
        , un modèle de courrier élaboré par la CNIL.
      </p>

      <p>
        Le responsable de traitement s’engage à répondre dans un délai
        raisonnable qui ne saurait dépasser 1 mois à compter de la réception de
        votre demande.
      </p>

      <h3>Destinataires des données</h3>

      <p>
        Le responsable de traitement s’engage à ce que les données à caractère
        personnels soient traitées par les seules personnes autorisées,
        notamment au sein de l’équipe MonPsySanté.
      </p>
    </div>
  </React.Fragment>
);
export default Page;
