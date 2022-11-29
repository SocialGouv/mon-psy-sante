import React, { useState } from "react";

import Breadcrumb from "../components/Breadcrumb";
import HeadTag from "../components/HeadTag";

const Page = () => {
  const [video, setVideo] = useState<"hide" | "show">("hide");
  return (
    <>
      <HeadTag
        title="Rejoindre le réseau de psychologues partenaires | ParcoursPsy"
        description="Rejoignez le réseau de psychologues partenaires ParcoursPsy, et proposez aux patients un accompagnement psychologique remboursé par l’Assurance Maladie."
        image="psy.svg"
      />
      <section>
        <div className="fr-container fr-mb-6w">
          <Breadcrumb page="Vous êtes psychologue" />

          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row--middle">
            <div className="fr-col-12 fr-col-lg-7">
              <h1>
                Vous êtes psychologue,
                <span className="fr-text--lead d-block fr-mt-3w">
                  Rejoignez le réseau des psychologues partenaires&nbsp;!
                </span>
              </h1>
              <a
                className="fr-btn fr-fi-edit-line fr-btn--icon-left fr-mb-4w"
                target="_blank"
                href="https://www.demarches-simplifiees.fr/commencer/monpsy"
                title="Je Candidate"
                rel="noreferrer"
              >
                Candidater
              </a>
            </div>
            <div className="fr-col-12 fr-col-lg-5 align-center">
              <img src="/images/psy.svg" height="360" alt="" />
              {video === "hide" && (
                <div className="align-left">
                  <button
                    onClick={() => setVideo("show")}
                    title="Découvrir ParcoursPsy en vidéo, via le témoignage d’Annie, psychologue partenaire"
                    className="fr-btn fr-btn--lg fr-btn--secondary fr-fi-play-line fr-btn--icon-left fr-mt-4w"
                  >
                    Découvrez le témoignage d’Annie, psychologue partenaire
                  </button>
                  <span className="d-block fr-mt-1w">Durée&nbsp;: 2min</span>
                </div>
              )}
            </div>
            {video === "show" && (
              <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-pb-8w">
                <div className="fr-col-8">
                  <video width="100%" controls autoPlay>
                    <source
                      type="video/mp4"
                      src="/images/Video-Temoignage.mp4"
                    />
                    <track
                      kind="captions"
                      srcLang="fr"
                      src="/images/Video-Temoignage.mp4.vtt"
                      label="Activés"
                    />
                  </video>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container">
          <div className="fr-my-9w fr-md-mx-8w">
            <ul className="no-bullet">
              <BulletPoint title="Un engagement social">
                Vous permettez à des publics, qui ne bénéficiaient pas
                jusqu’alors de suivi psychologique, d’avoir recours à votre
                expertise et vos compétences.
              </BulletPoint>
              <BulletPoint title="Un acte préventif">
                Vous contribuez au repérage précoce des troubles psychiques chez
                les personnes qui ne consultaient pas de psychologue jusqu’à
                présent.
              </BulletPoint>
              <BulletPoint title="Un écosystème pluridisciplinaire">
                Grâce à votre conventionnement avec l’Assurance Maladie, vous
                faites partie du parcours de soins des patients en relation avec
                les autres professionnels de santé.
              </BulletPoint>
              <BulletPoint title="Une meilleure visibilité">
                Vos coordonnées apparaissent publiquement sur l’annuaire
                ParcoursPsy mis en ligne par le Ministère de la Santé et
                l’Assurance Maladie.
              </BulletPoint>
              <BulletPoint title="Une quotité de travail choisie">
                Vous pouvez continuer à réaliser des séances à tarif libre (non
                remboursées par l’Assurance Maladie) en dehors du dispositif
                ParcoursPsy.
              </BulletPoint>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="fr-container--fluid fr-bg--light fr-my-4w fr-py-4w">
          <div className="fr-container fr-mb-4w">
            <h2>Les étapes pour être psychologue partenaire</h2>
          </div>
          <div className="fr-grid-row fr-grid-row--center fr-md-px-3w">
            <CardStep title="Candidature" number="1">
              <p>
                Complétez votre candidature en ligne en joignant les pièces
                justificatives
              </p>
              <ul>
                <li>
                  <a
                    href="/documents/MonPsy_Flyer-Démarches simplifiées_2022.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Tutoriel Démarches simplifiées en PDF"
                  >
                    Tutoriel Démarches simplifiées (PDF)
                  </a>
                </li>
                <li>
                  <a
                    href="/documents/MonPsy_Flyer-candidatures-psychologues_2022.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    title=" Brochure informative en PDF"
                  >
                    Brochure informative (PDF)
                  </a>
                </li>
              </ul>
            </CardStep>
            <CardStep title="Éligibilité de votre dossier" number="2">
              <p>Des experts analysent l’éligibilité&nbsp;:</p>
              <ul>
                <li>être inscrit au registre ADELI en tant que psychologue</li>
                <li>parcours consolidé en psychologie clinique</li>
                <li>au moins 3 ans d’expérience clinique</li>
              </ul>
            </CardStep>
            <CardStep title="Signature de la Convention" number="3">
              <p>
                Si votre dossier est éligible, il est transmis à la CPAM de
                votre département d’exercice qui réalise votre conventionnement.
              </p>
            </CardStep>
            <CardStep title="Publication sur l’annuaire" number="4">
              <p>
                Une fois conventionné, vos coordonnées sont publiées sur
                l’annuaire ParcoursPsy. Vous pouvez indiquer aux patients si
                vous êtes ou non disponible.
              </p>
            </CardStep>
            <CardStep title="Accueil des patients" number="5">
              <p>
                Une fois ces étapes réalisées, vous pouvez commencer à recevoir
                des patients dans le cadre de ParcoursPsy&nbsp;!
              </p>
            </CardStep>
          </div>
        </div>
      </section>

      <section>
        <div className="fr-container--fluid fr-pt-3w fr-mb-7w">
          <div className="fr-container">
            <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
              <div className="fr-col-12">
                <h2>L’accompagnement du patient</h2>
              </div>
              <PatientCard
                title="1. Un premier rendez-vous d’évaluation en présentiel"
                image="/images/icones/survey.svg"
              >
                Le patient vous présente le{" "}
                <strong>courrier d’adressage</strong> du médecin. Lors de cette
                première séance, vous réalisez un entretien d’évaluation pour{" "}
                <strong>déterminer le nombre de séances nécessaires</strong>.
              </PatientCard>
              <PatientCard
                title="2. L’accompagnement"
                image="/images/icones/calendar.svg"
              >
                En fonction de l’état de santé du patient, vous réalisez jusqu’à{" "}
                <strong>7 séances de suivi remboursées par an</strong>. Vous
                pouvez proposer à votre patient de réaliser les séances de suivi
                psychologique en téléconsultation si vous le souhaitez.
              </PatientCard>
              <PatientCard
                title="3. Le paiement des séances"
                image="/images/icones/money_transfer.svg"
              >
                <span>
                  Le patient vous rémunère directement après chaque séance ou à
                  la fin de plusieurs séances selon votre choix&nbsp;; et&nbsp;:
                </span>
                <li>
                  Vous complétez et lui remettez une feuille de soins pour qu’il
                  soit remboursé (
                  <a
                    href="https://www.ameli.fr/psychologue/exercice-professionnel/facturation/regle-de-facturation-sans-tiers-payant"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Règles de facturation sans tiers payant
                  </a>
                  )
                </li>
                <li>
                  Certains patients n’avancent pas les frais (
                  <a
                    href="https://www.ameli.fr/psychologue/exercice-professionnel/facturation/regle-de-facturation-avec-tiers-payant"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Règles de facturation avec tiers payant
                  </a>
                  ).
                </li>
                <p>
                  <strong>
                    40€ pour l’entretien d’évaluation et 30€ pour chaque séance
                    de suivi
                  </strong>
                  .
                </p>
              </PatientCard>
              <PatientCard
                title="4. L’échange avec le médecin"
                image="/images/icones/communication.svg"
              >
                A la fin de l’accompagnement, en accord avec le patient, vous
                adressez au médecin,{" "}
                <strong>un compte-rendu de fin de prise en charge</strong>.{" "}
                <strong>En cas de non amélioration des symptômes,</strong> une
                concertation avec le médecin et un psychiatre est nécessaire
                pour prévoir la suite de la prise en charge.
              </PatientCard>
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
              <div>
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                  target="_blank"
                  href="/documents/MonPsy_Guide psychologue_2022.pdf"
                  title="Guide pour les psychologues en PDF"
                >
                  Guide pour les psychologues (PDF)
                </a>
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                  target="_blank"
                  href="/documents/MonPsy_Livret_échelles évaluations_2022.pdf"
                  title="Echelles d’évaluation en PDF"
                >
                  Echelles d’évaluation (PDF)
                </a>
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                  target="_blank"
                  href="/documents/MonPsy_Flyer-Feuille de soin_2022.pdf"
                  title="Comment compléter une feuille de soins en PDF"
                >
                  Comment compléter une feuille de soins&nbsp;? (PDF)
                </a>
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                  target="_blank"
                  href="/documents/MonPsy_Fiche-Memo_Psy.pdf"
                  title="Fiche mémo pour les psychologues en PDF"
                >
                  Fiche mémo pour les psychologues (PDF)
                </a>
              </div>
            </div>
            <div>
              <strong className="fr-text--lg">Des questions&nbsp;?</strong>
              <a
                href="/faq?tab=psychologue"
                className="fr-link fr-fi-question-line fr-link--icon-left"
              >
                Consultez la Foire Aux Questions
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

function PatientCard({ title, image, children }) {
  return (
    <>
      <div className="fr-col-12 fr-col-md-2 align-center">
        <img src={image} alt="" height="60" />
      </div>
      <div className="fr-col-12 fr-col-md-10">
        <div className="fr-card fr-card--no-arrow fr-bg--tilleul-light">
          <div className="fr-card__body">
            <div className="fr-card__content">
              <h3 className="fr-card__title fr-text--dark-blue">{title}</h3>
              <div className="fr-card__desc fr-text--md">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function BulletPoint({ children, title }) {
  return (
    <li className="flex-row">
      <div
        aria-hidden="true"
        className="fr-fi-arrow-right-line fr-mt-1w fr-text--dark-blue"
      />
      <div className="fr-ml-2w fr-mb-2w">
        <p className="fr-text--lg fr-mb-0">
          <strong>{title}</strong>
        </p>
        <p>{children}</p>
      </div>
    </li>
  );
}

function CardStep({ children, title, number }) {
  return (
    <div className="fr-col-10 fr-col-md fr-my-1w">
      <div className="fr-card align-center fr-card--no-arrow fr-mx-1w">
        <div className="fr-card__body">
          <strong className="fr-display-xs">{number}</strong>
          <h3 className="fr-card__title fr-mb-4w">{title}</h3>
          <div className="fr-card__desc align-left">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Page;
