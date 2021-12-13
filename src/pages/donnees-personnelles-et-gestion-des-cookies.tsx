import Head from "next/head";
import React from "react";

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Données personnelles et gestion des cookies | Mon Psy Santé</title>
    </Head>
    <div className="fr-container fr-my-6w">
      <h1>Données personnelles et gestion des cookies Mon Psy Santé</h1>
      <h2>Cookies et traceurs</h2>
      <h3>Qu’est-ce qu’un cookie ?</h3>

      <p>
        Un cookie est un fichier déposé sur votre terminal lors de la visite
        d’un site. Il a pour but de collecter des informations relatives à votre
        navigation et de vous adresser des services adaptés à votre terminal
        (ordinateur, mobile ou tablette).
      </p>

      <p className="fr-mb-1v">Il convient d’indiquer que :</p>
      <ul>
        <li>
          Les données collectées ne sont pas recoupées avec d’autres traitements
        </li>
        <li>
          Les cookies ne permettent pas de suivre la navigation de l’internaute
          sur d’autres sites
        </li>
      </ul>

      <h3>Quels sont les cookies et traceurs que nous utilisons ?</h3>

      <div className="fr-table fr-table--bordered">
        <table>
          <tr>
            <td>Cookies</td>
            <td>Traitement réalisé</td>
            <td>Base juridique</td>
            <td>Garanties</td>
          </tr>
          <tr>
            <td>Data.gouv</td>
            <td>Analyse statistique des activités</td>
            <td>Article 82 de la loi n°78-17 du 6 janvier 1978 modifiée</td>
            <td>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.data.gouv.fr/fr/suivi"
              >
                https://www.data.gouv.fr/fr/suivi
              </a>
            </td>
          </tr>
        </table>
      </div>

      <p>
        A titre d’information, nous utilisons également Matomo un outil libre
        qui ne collecte que des informations anonymisées et paramétré pour être
        en conformité avec les recommandations de la CNIL. Cela signifie que
        votre adresse IP, par exemple, est anonymisée avant l’enregistrement. Il
        est donc impossible d’associer vos visites sur ce site à votre personne.
      </p>

      <h3>Qu’est-ce qui nous autorise à les déposer ?</h3>

      <p>
        En application de l’article 5(3) de la directive 2002/58/CE modifiée
        concernant le traitement des données à caractère personnel et la
        protection de la vie privée dans le secteur des communications
        électroniques, transposée à l’article 82 de la loi n°78-17 du 6 janvier
        1978 relative à l’informatique, aux fichiers et aux libertés, les
        traceurs ou cookies suivent deux régimes distincts.
      </p>
      <p>
        Les cookies strictement nécessaires au service, ceux de publicité non
        personnalisée ou ayant pour finalité exclusive de faciliter la
        communication par voie électronique sont dispensés de consentement
        préalable au titre de l’article 82 de la loi n°78-17 du 6 janvier 1978.
      </p>
      <p>
        Les autres cookies n’étant pas strictement nécessaires au service ou
        n’ayant pas pour finalité exclusive de faciliter la communication par
        voie électronique doivent être consenti par l’utilisateur.
      </p>
      <p>
        Ce consentement de la personne concernée pour une ou plusieurs finalités
        spécifiques constitue une base légale au sens du RGPD et doit être
        entendu au sens de l’article 6-a du Règlement (UE) 2016/679 du Parlement
        européen et du Conseil du 27 avril 2016 relatif à la protection des
        personnes physiques à l’égard du traitement des données à caractère
        personnel et à la libre circulation de ces données.
      </p>

      <h3>Durée de conservation</h3>

      <p>
        Nous conservons les cookies pour une durée de 13 mois ou, le cas échéant
        dès le retrait du consentement.
      </p>

      <h2 id="mention-donnees-perso">Mention Données personnelles</h2>

      <h3>Responsable de traitements</h3>

      <p>
        «« PsyEnfantsAdo » est développé au sein de l’incubateur BetaGouv et
        porté par la Direction interministérielle du numérique (DINUM).
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
        {" "}
        PsyEnfantsAdo conserve et diffuse vos données à caractère personnel
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
        {" "}
        Pour les exercer, faites-nous parvenir une demande en précisant la date
        et l’heure précise de la requête – ces éléments sont indispensables pour
        nous permettre de retrouver votre recherche – par voie électronique à
        l’adresse suivante : <strong>monpsy@sante.gouv.FR</strong>
      </p>

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
        notamment au sein de l’équipe PsyEnfantsAdo.
      </p>
    </div>
  </React.Fragment>
);
export default Page;
