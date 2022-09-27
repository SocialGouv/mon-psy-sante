import Head from "next/head";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <Head>
        <title>Accessibilité | MonPsy</title>
      </Head>

      <div className="fr-container fr-my-6w">
        <h1>Déclaration d&apos;accessibilité</h1>
        <div className="fr-mt-3w">
          <p>
            Le Ministère des Solidarités et de la Santé s’engage à rendre ses
            sites internet, intranet, extranet et ses progiciels accessibles
            conformément à l’article 47 de la loi n°2005-102 du 11 février 2005.
          </p>
          <p>
            À cette fin, elle met en œuvre la stratégie et les actions
            suivantes&nbsp;:
          </p>
          <ul>
            <li>La réalisation d’un audit de conformité le 20 juillet 2022.</li>
            <li>
              La mise en œuvre des recommandations pour atteindre l’objectif de
              75% d’ici la fin de l’année 2022.
            </li>
          </ul>
          <p>
            Cette déclaration d&apos;accessibilité s&apos;applique au Ministère
            des Solidarités et de la Santé&nbsp;:{" "}
            <Link href="/">
              <a>https://monpsy.sante.gouv.fr/</a>
            </Link>
          </p>
          <h2>État de conformité</h2>
          <p>
            Ministère des Solidarités et de la Santé –{" "}
            <Link href="/">
              <a>MonPsy</a>
            </Link>{" "}
            est en conformité partielle avec le référentiel général
            d’amélioration de l’accessibilité (RGAA) «&nbsp;version 4.1&nbsp;»
            en raison des non-conformités et des dérogations énumérées
            ci-dessous. Nous tâchons de rendre dès la conception, ce site
            accessible à toutes et à tous.
          </p>
          <h2>Résultats des tests</h2>
          <p>
            L’audit de conformité réalisé par URBILOG révèle que 49,06 % des
            critères du RGAA version 4.1 sont respectés. Le taux moyen de
            conformité du service en ligne est de 68%.
          </p>
          <p>
            Après la correction de la majeure partie des problèmes soulevés par
            l’audit, 81.13% des critères du RGAA version 4.1 sont respectés. Le
            taux moyen de conformité du service en ligne est de 94.87%.
          </p>
          <p>
            Nous avons pour objectif de garder un taux de conformité supérieur à
            75%.
          </p>
          <h2>Contenus non-accessibles</h2>
          <p>
            Les contenus listés ci-dessous ne sont pas accessibles pour les
            raisons suivantes&nbsp;:
          </p>

          <h4>Non conformité</h4>

          <ul>
            <li>
              Critère 3.3&nbsp;: Dans chaque page web, les couleurs utilisées
              dans les composants d’interface ou les éléments graphiques
              porteurs d’informations sont-elles suffisamment contrastées (hors
              cas particuliers).
            </li>
            <li>
              Critère 7.3&nbsp;: Chaque script est-il contrôlable par le clavier
              et par tout dispositif de pointage (hors cas particuliers)&nbsp;?
            </li>
            <li>
              Critère 7.4&nbsp;: Pour chaque script qui initie un changement de
              contexte, l’utilisateur est-il averti ou en a-t-il le
              contrôle&nbsp;?
            </li>
            <li>
              Critère 9.3&nbsp;: Dans chaque page web, chaque liste est-elle
              correctement structurée&nbsp;?
            </li>
            <li>
              Critère 11.10&nbsp;: Dans chaque formulaire, le contrôle de saisie
              est-il utilisé de manière pertinente (hors cas
              particuliers)&nbsp;?
            </li>
            <li>
              Critère 11.11&nbsp;: Dans chaque formulaire, le contrôle de saisie
              est-il accompagné, si nécessaire, de suggestions facilitant la
              correction des erreurs de saisie&nbsp;?
            </li>
            <li>
              Critère 12.1&nbsp;: Chaque ensemble de pages dispose-t-il de deux
              systèmes de navigation différents, au moins (hors cas
              particuliers)&nbsp;?
            </li>
            <li>
              Critère 12.8&nbsp;: Dans chaque page web, l’ordre de tabulation
              est-il cohérent&nbsp;?
            </li>
            <li>
              Critère 13.3&nbsp;: Dans chaque page web, chaque document
              bureautique en téléchargement possède-t-il, si nécessaire, une
              version accessible (hors cas particuliers)&nbsp;?
            </li>
            <li>
              Critère 13.9&nbsp;: Dans chaque page web, le contenu proposé
              est-il consultable quelle que soit l’orientation de l’écran
              (portait ou paysage) (hors cas particuliers)&nbsp;?
            </li>
          </ul>

          <h2>Établissement de cette déclaration d&apos;accessibilité</h2>
          <p>
            Cette déclaration d&apos;accessibilité a été établie le 20/07/2022.
            Mise à jour le 27/09/2022.
          </p>

          <p>
            Technologies utilisées pour la réalisation de{" "}
            <Link href="/">
              <a>https://monpsy.sante.gouv.fr/</a>
            </Link>
            &nbsp;:
          </p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
          </ul>

          <h2>Environnement de test</h2>
          <p>
            Les vérifications de restitution de contenus ont été réalisées sur
            la base de la combinaison fournie par la base de référence du RGAA
            4.1, avec les versions suivantes :
          </p>
          <ul>
            <li>NVDA 2021.2 et Firefox 98</li>
            <li>VoiceOver Mac OS 12.2 et Safari : 15.3</li>
          </ul>

          <h2>Outils pour évaluer l&apos;accessibilité</h2>
          <ul>
            <li>Barre extension de contrôle de taux de contraste</li>
            <li>Barre extension Assistant RGAA V4.1 Compéthance</li>
            <li>Barre extension Web Developer toolbar</li>
            <li>Inspecteur du navigateur</li>
            <li>UserCSS</li>
          </ul>

          <h2>
            Pages du site ayant fait l&apos;objet de la vérification de
            conformité
          </h2>

          <ul>
            <li>
              Page Accueil{" "}
              <Link href="/">
                <a>https://monpsy.sante.gouv.fr/</a>
              </Link>
            </li>
            <li>
              Page Accessibilité{" "}
              <Link href="/mentions-legales#accessibilite">
                <a>
                  https://monpsy.sante.gouv.fr/mentions-legales#accessibilite
                </a>
              </Link>
            </li>
            <li>
              Page Mentions légales{" "}
              <Link href="/mentions-legales">
                <a>https://monpsy.sante.gouv.fr/mentions-legales</a>
              </Link>
            </li>
            <li>
              Page Nous contacter{" "}
              <Link href="/contact">
                <a>https://monpsy.sante.gouv.fr/</a>
              </Link>
            </li>
            <li>
              Page FAQ{" "}
              <Link href="/faq">
                <a>https://monpsy.sante.gouv.fr/faq</a>
              </Link>
            </li>
            <li>
              Page Psychologue{" "}
              <Link href="/psychologues">
                <a>https://monpsy.sante.gouv.fr/psychologues</a>
              </Link>
            </li>
            <li>
              Page Annuaire{" "}
              <Link href="/annuaire">
                <a>https://monpsy.sante.gouv.fr/annuaire</a>
              </Link>
            </li>
          </ul>

          <h2>Retour d&apos;information et contact</h2>
          <p>
            Si vous n’arrivez pas à accéder à un contenu ou à un service, vous
            pouvez contacter le responsable du site internet{" "}
            <Link href="/">
              <a>https://monpsy.sante.gouv.fr</a>
            </Link>{" "}
            pour être orienté vers une alternative accessible ou obtenir le
            contenu sous une autre forme.
          </p>
          <p>
            E-mail :{" "}
            <a href={`mailto:monpsysante@fabrique.social.gouv.fr`}>
              monpsysante@fabrique.social.gouv.fr
            </a>
          </p>
          <p>Nous essayons de répondre le plus rapidement possible.</p>

          <h2>Voies de recours</h2>
          <p>
            Cette procédure est à utiliser dans le cas suivant. Vous avez
            signalé au responsable du site internet un défaut d’accessibilité
            qui vous empêche d’accéder à un contenu ou à un des services du
            portail et vous n’avez pas obtenu de réponse satisfaisante.
          </p>
          <ul>
            <li>
              Écrire un message au Défenseur des droits&nbsp;:
              <br />
              <a
                href="https://formulaire.defenseurdesdroits.fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://formulaire.defenseurdesdroits.fr/
              </a>
            </li>
            <li>
              Contacter le délégué du Défenseur des droits dans votre
              région&nbsp;:
              <br />
              <a
                href="https://www.defenseurdesdroits.fr/saisir/delegues"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.defenseurdesdroits.fr/saisir/delegues
              </a>
            </li>
            <li>
              Envoyer un courrier par la poste (gratuit, ne pas mettre de
              timbre) :
              <address className="fr-mb-2w">
                Défenseur des droits
                <br />
                Libre réponse 71120
                <br />
                75342 Paris CEDEX 07
              </address>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default Page;
