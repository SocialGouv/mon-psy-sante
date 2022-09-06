import Link from "next/link";
import React from "react";

export default function Accessibility() {
  return (
    <div id="accessibilite" className="fr-mt-3w">
      <h2>Déclaration d&apos;accessibilité</h2>
      <p>
        Le Ministère des Solidarités et de la Santé s’engage à rendre ses sites
        internet, intranet, extranet et ses progiciels accessibles conformément
        à l’article 47 de la loi n°2005-102 du 11 février 2005.
      </p>
      <p>
        À cette fin, elle met en œuvre la stratégie et les actions
        suivantes&nbsp;:
      </p>
      <ul>
        <li>La réalisation d’un audit de conformité le 20 juillet 2022.</li>
        <li>
          La mise en œuvre des recommandations pour atteindre l’objectif de 75%
          d’ici la fin de l’année 2022.
        </li>
      </ul>
      <p>
        Cette déclaration d&apos;accessibilité s&apos;applique au Ministère des
        Solidarités et de la Santé&nbsp;:{" "}
        <Link href="/">
          <a>https://monpsy.sante.gouv.fr/</a>
        </Link>
      </p>
      <h3>État de conformité</h3>
      <p>
        Ministère des Solidarités et de la Santé –{" "}
        <Link href="/">
          <a>MonPsy</a>
        </Link>{" "}
        n’est pas conforme avec le référentiel général d’amélioration de
        l’accessibilité (RGAA), version 4.1 en raison des non-conformités et des
        dérogations énumérées ci-dessous.
      </p>
      <h3>Résultats des tests</h3>
      <p>
        L’audit de conformité réalisé par URBILOG révèle que 49,06 % des
        critères du RGAA version 4.1 sont respectés. Le taux moyen de conformité
        du service en ligne est de 68%.
      </p>
      <h3>Contenus non-accessibles</h3>
      <p>
        Les contenus listés ci-dessous ne sont pas accessibles pour les raisons
        suivantes&nbsp;:
      </p>

      <h4>Non conformité</h4>

      <ol>
        <li>
          Images
          <ul>
            <li>Les images de décoration ne sont pas ignorées.</li>
          </ul>
        </li>

        <li>
          Cadres
          <ul>
            <li>Rien à signaler.</li>
          </ul>
        </li>

        <li>
          Couleurs
          <ul>
            <li>L’information n’est transmise que par la couleur.</li>
            <li>Des taux de contraste sont insuffisants.</li>
          </ul>
        </li>

        <li>
          Multimédia
          <ul>
            <li>Une vidéo ne possède de transcription textuelle.</li>
            <li>
              Un élément du lecteur multimédia n’est pas compatible avec les
              technologies d’assistance.
            </li>
          </ul>
        </li>

        <li>
          Tableaux
          <ul>
            <li>Rien à signaler.</li>
          </ul>
        </li>

        <li>
          Liens
          <ul>
            <li>Les intitulés des liens ne sont pas pertinents.</li>
          </ul>
        </li>

        <li>
          Scripts
          <ul>
            <li>
              Des scripts ne sont pas compatibles avec les technologies
              d’assistance.
            </li>
            <li>
              Des scripts ne sont pas contrôlables au clavier ou par tout
              dispositif de pointage.
            </li>
            <li>
              L’utilisateur n’est pas averti ou n’a pas le contrôle du
              changement de contexte.
            </li>
          </ul>
        </li>

        <li>
          Éléments obligatoires
          <ul>
            <li>Des titre de pages ne sont pas pertinents.</li>
          </ul>
        </li>

        <li>
          Structuration de l&apos;information
          <ul>
            <li>
              L’information n’est pas structurée par l’utilisation appropriée de
              titres.
            </li>
            <li>La structure du document n’est pas cohérente.</li>
            <li>Des listes ne sont pas correctement structurées.</li>
          </ul>
        </li>

        <li>
          Présentation de l&apos;information
          <ul>
            <li>
              Des éléments porteurs d’informations disparaissent lorsque le CSS
              est désactivé.
            </li>
            <li>
              Présence d’une barre de défilement sur un écran de 320px de large.
            </li>
          </ul>
        </li>

        <li>
          Formulaires
          <ul>
            <li>Des champs de formulaires n’ont pas d’étiquettes.</li>
            <li>Des intitulés des boutons non pertinents.</li>
            <li>
              Le contrôle de saisie n’est pas utilisé de manière pertinente.
            </li>
            <li>
              Le contrôle de saisie n’est pas accompagné, si nécessaire, de
              suggestions facilitant la correction des erreurs.{" "}
            </li>
          </ul>
        </li>

        <li>
          Navigation
          <ul>
            <li>Absence de deux systèmes de navigation.</li>
            <li>Le lien d’évitement n’est pas totalement utilisable.</li>
            <li>L’ordre de tabulation n’est pas cohérent.</li>
          </ul>
        </li>

        <li>
          Consultation
          <ul>
            <li>
              Des documents offerts au téléchargement ne sont pas accessibles
              et/ou n’ont pas d’alternative accessible.
            </li>
            <li>
              Du contenu proposé n’est pas consultable quelle que soit
              l&apos;orientation de l&apos;écran (portait ou paysage).
            </li>
          </ul>
        </li>
      </ol>

      <h4>Dérogation pour charge disproportionnée</h4>
      <ul>
        <li>Rien à signaler</li>
      </ul>

      <h4>Contenus non-soumis à l&apos;obligation d&apos;accessibilité</h4>
      <ul>
        <li>Rien à signaler</li>
      </ul>

      <h3>Établissement de cette déclaration d&apos;accessibilité</h3>
      <p>Cette déclaration d&apos;accessibilité a été établie le 20/07/2022.</p>

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

      <h3>Environnement de test</h3>
      <p>
        Les vérifications de restitution de contenus ont été réalisées sur la
        base de la combinaison fournie par la base de référence du RGAA 4.1,
        avec les versions suivantes :
      </p>
      <ul>
        <li>NVDA 2021.2 et Firefox 98</li>
        <li>VoiceOver Mac OS 12.2 et Safari : 15.3</li>
      </ul>

      <h3>Outils pour évaluer l&apos;accessibilité</h3>
      <ul>
        <li>Barre extension de contrôle de taux de contraste</li>
        <li>Barre extension Assistant RGAA V4.1 Compéthance</li>
        <li>Barre extension Web Developer toolbar</li>
        <li>Inspecteur du navigateur</li>
        <li>UserCSS</li>
      </ul>

      <h3>
        Pages du site ayant fait l&apos;objet de la vérification de conformité
      </h3>

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
            <a>https://monpsy.sante.gouv.fr/mentions-legales#accessibilite</a>
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
        <li>
          <del>Page Patients</del>{" "}
          <em>La page patients a été fusionnée avec la page d&apos;accueil</em>
        </li>
      </ul>

      <h3>Retour d&apos;information et contact</h3>
      <p>
        Si vous n’arrivez pas à accéder à un contenu ou à un service, vous
        pouvez contacter le responsable du site internet{" "}
        <Link href="/">
          <a>https://monpsy.sante.gouv.fr</a>
        </Link>{" "}
        pour être orienté vers une alternative accessible ou obtenir le contenu
        sous une autre forme.
      </p>
      <p>
        E-mail :{" "}
        <a href={`mailto:monpsysante@fabrique.social.gouv.fr`}>
          monpsysante@fabrique.social.gouv.fr
        </a>
      </p>
      <p>Nous essayons de répondre le plus rapidement possible.</p>

      <h3>Voies de recours</h3>
      <p>
        Cette procédure est à utiliser dans le cas suivant. Vous avez signalé au
        responsable du site internet un défaut d’accessibilité qui vous empêche
        d’accéder à un contenu ou à un des services du portail et vous n’avez
        pas obtenu de réponse satisfaisante.
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
          Contacter le délégué du Défenseur des droits dans votre région&nbsp;:
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
          Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre) :
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
  );
}
