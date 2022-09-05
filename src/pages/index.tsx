import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import HeadTag from "../components/HeadTag";

const Page = () => {
  const router = useRouter();
  return (
    <>
      <HeadTag
        title="MonPsy : Le dispositif de remboursement des séances chez le psychologue | Ministère de la Santé"
        description="MonPsy est un dispositif du Ministère de la Santé permettant à chacun de bénéficier de séances remboursées avec un psychologue conventionné avec l’Assurance Maladie."
        image="Psychologist-hero.svg"
      />
      <section>
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-pb-8w">
            <div className="fr-col-12 fr-col-md-6 fr-pt-4w">
              <h1>
                Vous rencontrez une situation difficile&nbsp;?
                <span className="fr-text--lead d-block fr-mt-3w">
                  Avec MonPsy, bénéficiez de 8 séances par an chez un ou une
                  psychologue
                </span>
              </h1>
              <p className="fr-text--xl fr-text--bold fr-mt-5w">
                Les séances sont remboursées&nbsp;:
              </p>
              <ul className="no-bullet">
                <li className="fr-li--icon-left fr-fi-arrow-right-line fr-fi--sm">
                  &nbsp;par l’Assurance Maladie
                </li>
                <li className="fr-li--icon-left fr-fi-arrow-right-line fr-fi--sm">
                  &nbsp;et votre mutuelle ou complémentaire santé
                </li>
              </ul>
            </div>
            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-4">
              <img
                className="fr-mt-2w"
                src="/images/Psychologist-hero.svg"
                alt="En parler, c’est déjà se soigner"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container--fluid fr-bg--light fr-py-10w">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
              <div className="fr-col-12 fr-col-md-6">
                <h2>Pourquoi consulter&nbsp;?</h2>
                <ul>
                  <li>
                    Vous avez du <strong>mal à dormir</strong>&nbsp;?
                  </li>
                  <li>
                    Vous vous sentez <strong>dépassé</strong>&nbsp;?
                  </li>
                  <li>
                    Vous êtes dans une <strong>relation toxique</strong>&nbsp;?
                  </li>
                  <li>
                    Vous avez des <strong>difficultés</strong> à échanger avec
                    votre entourage&nbsp;?
                  </li>
                  <li>
                    Vous avez besoin d’une personne à qui parler,{" "}
                    <strong>sans jugement</strong>.
                  </li>
                </ul>
                <p>
                  Quelle que soit votre situation,{" "}
                  <Link href="/annuaire">
                    <a>trouvez des psychologues à votre écoute</a>
                  </Link>
                  .
                </p>
              </div>
              <div className="fr-col-12 fr-col-md-6">
                <h2 className="fr-h5">MonPsy c’est&nbsp;:</h2>
                <ul className="no-bullet">
                  <li className="fr-li--icon-left fr-fi-arrow-right-line fr-fi--sm">
                    &nbsp;Un annuaire de{" "}
                    <strong>psychologues partenaires expérimentés</strong>{" "}
                    sélectionnés sur leur expérience professionnelle.
                  </li>
                  <li className="fr-li--icon-left fr-fi-arrow-right-line fr-fi--sm">
                    &nbsp;Un parcours de soins{" "}
                    <strong>pris en charge par l’Assurance Maladie</strong>.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-container fr-callout fr-callout--pink-tuile fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
            <div className="fr-col-12 fr-col-md-5">
              <p>
                Le dispositif ne concerne pas les <strong>urgences</strong> et
                les personnes présentant un <strong>risque suicidaire</strong>.
              </p>
            </div>
            <div className="fr-col-12 fr-col-md-2 align-center">
              <span
                className="fr-fi-arrow-right-line fr-fi--lg"
                aria-hidden="true"
              />
            </div>

            <div className="fr-col-12 fr-col-md-5">
              <p>
                Si je suis en détresse et/ou j’ai des pensées suicidaires, je
                contacte sans attendre le{" "}
                <strong>
                  <a href="tel:3114">3114</a>
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container--fluid fr-bg--tilleul fr-py-10w">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
              <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8">
                <h2>Comment ça marche&nbsp;?</h2>
              </div>
              <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8">
                <div className="fr-card fr-card--no-arrow fr-bg--tilleul-light">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h4 className="fr-card__title fr-text--dark-blue">
                        1. Rencontrez un médecin
                      </h4>
                      <p className="fr-card__desc fr-text--md">
                        Le médecin échange avec vous pour s’assurer que MonPsy
                        est adapté à votre situation. Vous pouvez consulter
                        différents types de médecins (généraliste, gynécologue,
                        médecin scolaire, protection maternelle et infantile,
                        etc.)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8">
                <div className="fr-card fr-card--no-arrow fr-bg--tilleul-light">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h4 className="fr-card__title fr-text--dark-blue">
                        2. Prenez rendez-vous avec un psychologue partenaire
                      </h4>
                      <p className="fr-card__desc fr-text--md">
                        Commencez vos 8 séances par an en présentiel ou à
                        distance. La première séance doit obligatoirement être
                        en présentiel.
                      </p>
                      <div className="align-center">
                        <button
                          className="fr-btn"
                          onClick={() => router.push("/annuaire")}
                        >
                          Annuaire MonPsy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-4">
                <div className="fr-card fr-card--no-arrow fr-bg--tilleul-light">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h4 className="fr-card__title fr-text--dark-blue">
                        3. Faites vous rembourser
                      </h4>
                      <p className="fr-card__desc fr-text--md">
                        L’Assurance Maladie et votre mutuelle vous remboursent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fr-col-12 fr-col-md-4">
                <div className="fr-card fr-card--no-arrow fr-bg--tilleul-light">
                  <div className="fr-card__body">
                    <div className="fr-card__content">
                      <h4 className="fr-card__title fr-text--dark-blue">
                        3. Ou n’avancez aucun frais
                      </h4>
                      <p className="fr-card__desc fr-text--md">
                        Si vous êtes éligible au tiers payant obligatoire. (Voir
                        conditions{" "}
                        <Link href="#combien-ca-coute">
                          <a>ci-dessous</a>
                        </Link>
                        )
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container--fluid fr-py-10w">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-12">
                <h2 id="combien-ca-coute">Combien ça coûte&nbsp;?</h2>
              </div>
              <div className="fr-col-12 fr-col-md-6 fr-p-4w">
                <h4 className="fr-text--dark-blue">
                  Tarifs des séances des psychologues partenaires
                </h4>
                <ul className="no-bullet">
                  <li className="fr-li--icon-left fr-fi-arrow-right-line fr-fi--sm">
                    &nbsp;<strong>Première séance (évaluation)</strong>&nbsp;:
                    40 €
                  </li>
                  <li className="fr-li--icon-left fr-fi-arrow-right-line fr-fi--sm">
                    &nbsp;<strong>Les séances de suivi</strong>&nbsp;: 30 €
                  </li>
                </ul>
                <h4 className="fr-text--dark-blue">Prise en charge</h4>
                <ul className="no-bullet">
                  <li className="fr-li--icon-left fr-fi-arrow-right-line fr-fi--sm">
                    &nbsp;60 % par l’Assurance Maladie
                  </li>
                  <li className="fr-li--icon-left fr-fi-arrow-right-line fr-fi--sm">
                    &nbsp;40 % par la complémentaire santé ou la mutuelle
                  </li>
                </ul>
                <h5 className="fr-text--dark-blue fr-h6 fr-mb-1w fr-mt-3w">
                  Comment s’effectuent les remboursements&nbsp;?
                </h5>
                <p className="fr-text--dark-blue">
                  Envoyez votre feuille de soins et le courrier d’adressage de
                  votre médecin à votre organisme d’Assurance Maladie (après
                  chaque séance ou à la fin de plusieurs séances).
                </p>
              </div>
              <div className="fr-col-12 fr-col-md-6 fr-bg--tilleul-light fr-p-4w">
                <h4 className="fr-text--dark-blue">
                  Qui peut bénéficier du Tiers payant obligatoire&nbsp;?
                </h4>
                <h5 className="fr-h6">
                  Les personnes qui ont une souffrance en lien avec&nbsp;:
                </h5>
                <ul className="no-bullet">
                  <li className="fr-li--icon-left fr-fi-check-line fr-fi--sm">
                    &nbsp;Une Affection Longue Durée (ALD)
                  </li>
                  <li className="fr-li--icon-left fr-fi-check-line fr-fi--sm">
                    &nbsp;Une grossesse (à partir du 6ème mois)
                  </li>
                  <li className="fr-li--icon-left fr-fi-check-line fr-fi--sm">
                    &nbsp;Un accident du travail ou une maladie professionnelle
                    (AT-MP)
                  </li>
                </ul>
                <h5 className="fr-h6">Mais aussi…</h5>
                <ul className="no-bullet">
                  <li className="fr-li--icon-left fr-fi-check-line fr-fi--sm">
                    &nbsp;Les bénéficiaires de la Complémentaire Santé Solidaire
                    (CSS)
                  </li>
                  <li className="fr-li--icon-left fr-fi-check-line fr-fi--sm">
                    &nbsp;Les bénéficiaires de l’Aide Médicale de l’État (AME)
                  </li>
                </ul>
                <p className="fr-text--dark-blue">
                  Êtes-vous éligible à une aide&nbsp;?{" "}
                  <Link href="https://www.ameli.fr/assure/droits-demarches/difficultes-acces-droits-soins/complementaire-sante/simulateur-de-droits">
                    <a target="_blank" rel="noreferrer nofollow noopener">
                      Simulateur Prestations sociales
                    </a>
                  </Link>{" "}
                  et{" "}
                  <Link href="https://www.mesdroitssociaux.gouv.fr/accueil/">
                    <a target="_blank" rel="noreferrer nofollow noopener">
                      Droits sociaux
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container--fluid fr-py-5w fr-bg--light">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--align-center">
              <div className="fr-col-12 fr-col-md-4 align-center">
                <div className="fr-h2 fr-mb-2w">
                  <img src="/images/icones/approval.svg" alt="" height="40" />
                </div>
                <h5 className="fr-mb-1w fr-text--dark-blue">
                  Pour tout le monde
                </h5>
                <p className="fr-mb-1w">À partir de 3 ans </p>
              </div>
              <div className="fr-col-12 fr-col-md-4 align-center">
                <div className="fr-h2 fr-mb-2w">
                  <img
                    src="/images/icones/money_transfer.svg"
                    alt=""
                    height="40"
                  />
                </div>
                <h5 className="fr-mb-1w fr-text--dark-blue">Remboursé</h5>
                <p className="fr-mb-1w">Pris en charge ou sans frais </p>
              </div>
              <div className="fr-col-12 fr-col-md-4 align-center">
                <div className="fr-h2 fr-mb-2w">
                  <img src="/images/icones/survey.svg" alt="" height="40" />
                </div>
                <h5 className="fr-mb-1w fr-text--dark-blue">
                  En présentiel et en distanciel
                </h5>
                <p className="fr-mb-1w">En fonction des psychologues</p>
                <p className="fr-text--sm">
                  Première séance obligatoirement en présentiel
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="fr-container fr-py-10w">
          <div className="fr-grid-row fr-grid-row--center fr-index-box">
            <div className="fr-col-12 fr-col-md-8 fr-pt-4w">
              <h2>MonPsy pour les moins de 18 ans</h2>
              <ul className="no-bullet">
                <li className="fr-li--icon-left fr-fi-check-line fr-fi--sm">
                  &nbsp;À partir de <strong>3 ans</strong>.
                </li>
                <li className="fr-li--icon-left fr-fi-check-line fr-fi--sm">
                  &nbsp;<strong>Accord parental</strong> obligatoire.
                </li>
                <li className="fr-li--icon-left fr-fi-check-line fr-fi--sm">
                  &nbsp;Des psychologues qui reçoivent aussi les enfants et les
                  adolescents.
                </li>
              </ul>
              <button
                className="fr-btn fr-mt-2w"
                onClick={() => router.push("/annuaire")}
              >
                Annuaire MonPsy
              </button>
            </div>
            <div className="fr-col-12 fr-col-md-4 align-center">
              <img
                className="fr-mt-2w"
                height={250}
                src="/images/children.svg"
                alt="Je ne me sens pas bien, illustration d'un enfant sur une chaise"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="fr-container--fluid fr-py-7w fr-bg--tilleul-light">
          <div className="fr-container">
            <div className="fr-mb-2w">
              <strong className="fr-text--lg">
                La documentation à votre disposition&nbsp;:
              </strong>
              <a
                className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                target="_blank"
                rel="noreferrer nofollow noopener"
                href="/documents/MonPsy_Flyer grand public.pdf"
              >
                Flyer Grand Public
              </a>
            </div>
            <div>
              <strong className="fr-text--lg">Des questions&nbsp;?</strong>
              <a
                href="/faq?tab=patient"
                className="fr-link fr-fi-question-line fr-link--icon-left fr-ml-2w"
              >
                Je consulte la FAQ
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="fr-container fr-py-6w">
          <div className="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
            <div className="fr-col-12">
              <h2>Parlez à quelqu’un, gratuitement, à tout moment</h2>
            </div>
            <div className="fr-col-12 fr-col-md-4 fr-px-2w">
              <div className="align-center fr-my-2w fr-py-4w">
                <a
                  target="_blank"
                  className="fr-link"
                  title="3114"
                  href="https://www.3114.fr"
                  rel="noreferrer"
                >
                  <img
                    src="/images/logo-3114.svg"
                    alt="Logo 3114, Souffrance Prévention Suicide"
                    height="65"
                  />
                </a>
              </div>
              <p className="fr-h5">
                En détresse&nbsp;? Témoin d’un proche en souffrance&nbsp;?
              </p>
              <p>
                Des professionnels de santé formés à la prévention du suicide
                vous écoutent. Ils peuvent proposer des ressources adaptées à
                vos besoins.
              </p>
              <p className="fr-text--sm fr-text--muted">
                Disponible 7j/7, 24h/24, dans toute la France.
              </p>
              <ul>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer nofollow noopener"
                    href="tel:3114"
                  >
                    Appeler Souffrance Prévention du suicide
                  </a>
                </li>
              </ul>
            </div>
            <div className="fr-col-12 fr-col-md-4 fr-px-2w">
              <div className="align-center fr-my-2w">
                <a
                  target="_blank"
                  className="fr-link"
                  title="Fil santé jeunes"
                  href="https://www.filsantejeunes.com/"
                  rel="noreferrer"
                >
                  <img
                    src="/images/Filsantejeunes.jpg"
                    height="130"
                    alt="Logo Fil santé jeunes"
                  />
                </a>
              </div>
              <p className="fr-h5">
                Parler librement, sans jugement, de tout&nbsp;? C’est possible.
              </p>
              <p>
                Chat et permanence téléphonique anonymes pour les 12-25 ans sur,
                la santé, la sexualité, l’amour, le mal être, les relations
                familiales ou scolaires...
              </p>
              <p className="fr-text--sm fr-text--muted">
                Du lundi au dimanche de 9h à 23h.
              </p>

              <ul>
                <li>
                  <a
                    target="_blank"
                    href="https://www.filsantejeunes.com/tchat-individuel"
                    rel="noreferrer"
                  >
                    Chater sur Fil Santé Jeunes
                  </a>
                </li>
                <li>
                  <a href="tel:+33800235236">Appeler Fil Santé Jeunes</a>
                </li>

                <li>
                  <a
                    target="_blank"
                    href="https://www.acce-o.fr/client/fil-sante-jeunes"
                    rel="noreferrer"
                  >
                    Ligne pour les sourds et malentendants
                  </a>
                </li>
              </ul>
            </div>
            <div className="fr-col-12 fr-col-md-4 fr-px-2w">
              <div className="align-center align-middle fr-my-2w">
                <a
                  target="_blank"
                  className="fr-link"
                  title="SOS Amitié"
                  href="https://www.sos-amitie.com/ "
                  rel="noreferrer"
                >
                  <img
                    height="130"
                    src="/images/SOS-Amitie-logo.png"
                    alt="Logo SOS Amitié"
                  />
                </a>
              </div>
              <p className="fr-h5">
                Besoin de parler à quelqu’un&nbsp;? Pensées suicidaires&nbsp;?
              </p>
              <p>
                Le service d’aide par l’écoute, dispensé par des bénévoles,
                accueille la parole des personnes qui traversent une période
                difficile.
              </p>
              <p className="fr-text--sm fr-text--muted">
                Disponible 7j/7, 24h/24, dans 44 régions.
              </p>
              <ul>
                <li>
                  <a href="tel:+33972394050">Appeler SOS Amitié</a>
                </li>
                <li>
                  <a
                    href="https://www.sos-amitie.com/chat/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Chater sur SOS Amitié
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.sos-amitie.com/messagerie/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contacter par email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Page;
