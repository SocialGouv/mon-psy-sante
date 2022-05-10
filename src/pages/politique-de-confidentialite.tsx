import { Table } from "@dataesr/react-dsfr";
import Head from "next/head";
import React from "react";

const Page = () => {
  return (
    <>
      <Head>
        <title>Politique de confidentialité de MonPsy</title>
      </Head>
      <div className="fr-container fr-my-6w">
        <h1>Politique de confidentialité de MonPsy</h1>

        <div className="fr-mt-6w">
          <h2>Traitement des données à caractère personnel</h2>
          <p className="fr-mb-0">
            « MonPsy » est développé au sein de la Fabrique numérique des
            ministères sociaux.
          </p>
          <p className="fr-mb-0">
            Le responsable de traitement des données à caractère personnel
            collectées par le site « MonPsy » est la Délégation ministérielle à
            la santé mentale et à la psychiatrie, représenté par Monsieur Frank
            Bellivier, délégué ministériel.
          </p>
        </div>
        <div className="fr-mt-3w">
          <h2>Directeur de la publication</h2>
          <p className="fr-mb-2w">Monsieur Franck VON LENNEP, Directeur</p>
        </div>
        <div className="fr-mt-3w">
          <h2>Finalités</h2>
          <p className="fr-mb-2w">
            Dans le cadre de l’amélioration de la prise en charge de la santé
            mentale et des troubles psychiques d’intensité légère, le site
            MonPsy peut traiter des données à caractère personnelles pour la
            mise en œuvre d’un annuaire de psychologues disponible gratuitement
            et publiquement en ligne.
          </p>
        </div>
        <div className="fr-mt-3w">
          <h2>Données à caractère personnel traitées</h2>
          <p className="fr-mb-2w">
            Le site peut traiter les données à caractère personnel suivantes :
          </p>
          <ul>
            <li>
              Données professionnelles publiques relatives à la candidature (nom
              et prénom, département d’exercice, téléphone, adresse postale du
              cabinet, adresse e-mail professionnelle mentionnant nom et
              prénom);
            </li>
          </ul>
        </div>
        <div className="fr-mt-3w">
          <h2>Bases juridiques des traitements de données</h2>
          <p className="fr-mb-2w">
            Les données traitées par le site sont fondées sur l’exécution d’une
            mission d’intérêt public ou relevant de l’exercice de l’autorité
            publique dont est investi le responsable de traitement au sens de
            l’article 6-e du RPGD.
          </p>
          <p className="fr-mb-2w">
            Cette mission d’intérêt public est notamment prévue par :
          </p>
          <ul>
            <li>
              Les articles L. 162-58 et suivants du code de la sécurité sociale
              (traduction juridique à la déclaration du Président de la
              République du mardi 28 septembre 2021) Cet article prévoit le
              remboursement par l’Assurance maladie de séances d’accompagnement
              psychologique réalisées par des psychologues sélectionnés.
            </li>
            <li>
              L’article L. 3221-1 du code de la santé publique qui prévoit que
              la politique de santé mentale comprend des actions de prévention,
              de diagnostic, de soins, de réadaptation et de réinsertion sociale
              et qu’elle est mise en œuvre par des acteurs diversifiés
              intervenant dans ces domaines, notamment […] des psychologues […].
            </li>
          </ul>
        </div>
        <div className="fr-mt-3w">
          <h2>Durée de conservation</h2>
          <Table
            rowKey={(row) => row.type}
            data={[
              {
                type: "Données professionnelles publiques",
                duration:
                  "Jusqu’à 1 an après la fin de la convention entre le professionnel et la CPAM, ou à compter de la candidature du professionnel.",
              },
            ]}
            columns={[
              { name: "type", label: "Types de données" },
              { name: "duration", label: "Durée de conservation" },
            ]}
          />
        </div>
        <div className="fr-mt-3w">
          <h2>Droit des personnes concernées</h2>
          <p className="fr-mb-2w">
            Vous disposez des droits suivants concernant vos données à caractère
            personnel :
          </p>
          <ul>
            <li>Droit d’information et droit d’accès aux données ;</li>
            <li>
              Droit de rectification et le cas échéant de suppression des
              données ;
            </li>
            <li>Droit à la limitation des données.</li>
          </ul>
          <p className="fr-mb-0">
            Pour les exercer, faites-nous parvenir une demande en précisant la
            date et l’heure précise de la requête – ces éléments sont
            indispensables pour nous permettre de retrouver votre recherche –
            par voie électronique à l’adresse suivante :
          </p>
          <a href={`mailto:monpsysante@fabrique.social.gouv.fr`}>
            monpsysante@fabrique.social.gouv.fr
          </a>

          <p className="fr-my-2w">
            En raison de l’obligation de sécurité et de confidentialité dans le
            traitement des données à caractère personnel qui incombe au
            responsable de traitement, les demandes des personnes concernées ne
            seront traitées que si nous sommes en mesure de vous identifier de
            façon certaine.
          </p>
          <p className="fr-mb-2w">
            En cas de doute sérieux sur votre identité, nous pouvons être amenés
            à vous demander la communication d’une preuve d’identité.
          </p>
          <p className="fr-mb-2w">
            Pour vous aider dans votre démarche, vous trouverez{" "}
            <a
              href="https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces"
              target="_blank"
              rel="nofollow, noopener, noreferrer"
            >
              ici
            </a>
            , un modèle de courrier élaboré par la CNIL.
          </p>
          <p className="fr-mb-2w">
            Le responsable de traitement s’engage à répondre dans un délai
            raisonnable qui ne saurait dépasser 1 mois à compter de la réception
            de votre demande.
          </p>
        </div>
        <div className="fr-mt-3w">
          <h2>Destinataires des données</h2>
          <p className="fr-mb-2w">Les données sont disponibles publiquement.</p>
        </div>
        <div className="fr-mt-3w">
          <h2>Sécurité et confidentialité des données</h2>
          <p className="fr-mb-2w">
            Les mesures techniques et organisationnelles de sécurité adoptées
            pour assurer la confidentialité, l’intégrité et protéger l’accès des
            données sont notamment :
          </p>
          <ul>
            <li>Anonymisation</li>
            <li>Stockage des données en base de données</li>
            <li>Stockage des mots de passe en base sont hâchés</li>
            <li>Cloisonnement des données</li>
            <li>Mesures de traçabilité</li>
            <li>Surveillance</li>
            <li>Protection contre les virus, malwares et logiciels espions</li>
            <li>Protection des réseaux</li>
            <li>Sauvegarde</li>
            <li>
              Mesures restrictives limitant l’accès physiques aux données à
              caractère personnel
            </li>
          </ul>
        </div>
        <div className="fr-mt-3w">
          <h2>Sous-traitants</h2>
          <Table
            rowKey={(row) => row.name}
            data={[
              {
                name: "Microsoft Azure",
                country: "France",
                treatment: "Hébergement",
                urlName: "Déclaration de confidentialité Microsoft",
              },
            ]}
            columns={[
              { name: "name", label: "Partenaire" },
              { name: "country", label: "Pays destinataire" },
              {
                name: "treatment",
                label: "Traitement réalisé",
              },
              {
                name: "urlName",
                label: "Garantie",
                render: () => (
                  <a
                    title="privacy.microsoft.com/fr-fr/privacystatement"
                    target="_blank"
                    rel="nofollow, noopener, noreferrer"
                    href="https://privacy.microsoft.com/fr-fr/privacystatement"
                  >
                    privacy.microsoft.com/fr-fr/privacystatement
                  </a>
                ),
              },
            ]}
          />
        </div>
        <div className="fr-mt-3w">
          <h2>Cookies</h2>
          <p className="fr-mb-2w">
            Un cookie est un fichier déposé sur votre terminal lors de la visite
            d’un site. Il a pour but de collecter des informations relatives à
            votre navigation et de vous adresser des services adaptés à votre
            terminal (ordinateur, mobile ou tablette).
          </p>
          <p className="fr-mb-2w">
            Le site dépose des cookies de mesure d’audience (nombre de visites,
            pages consultées), respectant les conditions d’exemption du
            consentement de l’internaute définies par la recommandation «
            Cookies » de la Commission nationale informatique et libertés
            (CNIL). Cela signifie, notamment, que ces cookies ne servent qu’à la
            production de statistiques anonymes et ne permettent pas de suivre
            la navigation de l’internaute sur d’autres sites.
          </p>
          <p className="fr-mb-2w">
            Nous utilisons pour cela Matomo, un outil de mesure d’audience web
            libre, paramétré pour être en conformité avec la recommandation «
            Cookies » de la CNIL. Cela signifie que votre adresse IP, par
            exemple, est anonymisée avant d’être enregistrée. Il est donc
            impossible d’associer vos visites sur ce site à votre personne. Ces
            cookies ne peuvent être conservés plus de 13 mois.
          </p>
          <p className="fr-mb-2w"> Il convient d’indiquer que : </p>
          <ul>
            <li>
              Les données collectées ne sont pas recoupées avec d’autres
              traitements
            </li>
            <li>
              Les cookies ne permettent pas de suivre la navigation de
              l’internaute sur d’autres sites
            </li>
          </ul>
          <iframe
            title="matomo optout"
            style={{ border: 0, width: "100%" }}
            src="https://matomo.fabrique.social.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=fr&backgroundColor=&fontColor=161616&fontSize=14px&fontFamily=sans-serif"
          />
          <p className="fr-mb-2w">
            À tout moment, vous pouvez refuser l’utilisation des cookies et
            désactiver le dépôt sur votre ordinateur en utilisant la fonction
            dédiée de votre navigateur (fonction disponible notamment sur
            Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox,
            Apple Safari et Opera).
          </p>
          <p className="fr-mb-2w">
            Pour aller plus loin, vous pouvez consulter les fiches proposées par
            la Commission Nationale de l’Informatique et des Libertés (CNIL) :
          </p>
          <ul>
            <li>
              <a
                title="Déclaration de confidentialité Microsoft"
                target="_blank"
                rel="nofollow, noopener, noreferrer"
                href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi"
              >
                Cookies et traceurs : que dit la loi ?
              </a>
            </li>
            <li>
              <a
                title="Déclaration de confidentialité Microsoft"
                target="_blank"
                rel="nofollow, noopener, noreferrer"
                href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
              >
                Cookies : les outils pour les maîtriser
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Page;
