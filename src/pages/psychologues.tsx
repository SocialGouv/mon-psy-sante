import React from "react";

import HeadTag from "../components/HeadTag";

const Page = () => {
  return (
    <>
      <HeadTag
        title="Rejoindre le réseau de psychologues partenaires | MonPsy"
        description="Rejoignez le réseau de psychologues partenaires MonPsy, et proposez aux patients un accompagnement psychologique remboursé par l’Assurance Maladie."
        image="psy.svg"
      />
      <section>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row--middle">
            <div className="fr-col-12 fr-col-lg-7">
              <h1>Je suis psychologue</h1>
              <p>
                Je souhaite rejoindre le réseau des psychologues partenaires
              </p>
            </div>
            <div className="fr-col-12 fr-col-lg-5">
              <img
                src="/images/psy.svg"
                alt="Je suis psychologue illustration"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container--fluid fr-bg--light2 fr-py-4w">
          <div className="fr-container">
            <h2>Rejoignez le réseau des psychologues partenaires&nbsp;!</h2>
            <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
              <div className="fr-col-12 fr-col-lg-7">
                <p className="fr-mb-1v">
                  <strong>Je souhaite m’engager&nbsp;?</strong>
                </p>
                <p>
                  En rejoignant MonPsy, je permets à des publics, qui n’auraient
                  pas pu venir me consulter, d’avoir recours à mon expertise et
                  mes compétences, afin d’améliorer leur santé.
                </p>

                <p className="fr-mb-1v">
                  <strong>
                    Je souhaite participer à un échange
                    pluriprofessionnel&nbsp;?
                  </strong>
                </p>
                <p>
                  Avec ce dispositif, les psychologues partenaires et les
                  médecins construisent ensemble le parcours de soins en santé
                  mentale de demain, dans une approche collaborative au bénéfice
                  des patients.
                </p>

                <p className="fr-mb-1v">
                  <strong>Je souhaite bénéficier de visibilité&nbsp;?</strong>
                </p>
                <p>
                  Mes coordonnées apparaissent publiquement sur l’annuaire
                  MonPsy mis en ligne par le Ministère de la Santé et
                  l’Assurance Maladie.
                </p>

                <p className="fr-mb-1v">
                  <strong>
                    Je souhaite choisir mon niveau d’engagement&nbsp;?
                  </strong>
                </p>
                <p>
                  Je décide du temps consacré au dispositif MonPsy. L’activité
                  conventionnée n’est pas exclusive, je peux réaliser des
                  séances à tarif libre (non remboursées par l’Assurance
                  Maladie).
                </p>
              </div>
              <div className="fr-col-12 fr-col-lg-4 fr-col-lg-offset-1">
                <div className="fr-callout fr-callout-white align-center">
                  <a
                    className="fr-btn fr-btn--lg fr-fi-edit-line fr-btn--icon-left fr-mb-4w"
                    target="_blank"
                    href="https://www.demarches-simplifiees.fr/commencer/monpsy"
                    title="Je Candidate"
                    rel="noreferrer"
                  >
                    Candidater
                  </a>
                  <p>
                    Pour accompagner des patients dans le cadre du dispositif
                    MonPsy, il est nécessaire d’être conventionné avec
                    l’Assurance Maladie et de déposer un dossier de candidature.
                  </p>
                  <p>
                    <a
                      className="fr-link fr-fi-download-line fr-link--icon-left fr-mt-2w"
                      target="_blank"
                      href="/documents/MonPsy_Flyer-Démarches simplifiées_2022.pdf"
                    >
                      Tutoriel Démarches Simplifiées
                    </a>
                    <a
                      className="fr-link fr-fi-download-line fr-link--icon-left fr-mt-2w"
                      target="_blank"
                      href="/documents/MonPsy_Flyer-candidatures-psychologues_2022.pdf"
                    >
                      Brochure informative
                    </a>
                  </p>
                </div>
              </div>
              <div className="fr-col-12">
                <h2>
                  Quelles sont les étapes pour être psychologue
                  partenaire&nbsp;?
                </h2>
              </div>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-px-3w">
            <div className="fr-col-10 fr-col-lg">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">1</strong>
                  <h3 className="fr-card__title fr-mb-4w">Candidature</h3>
                  <div className="fr-card__desc">
                    <p>
                      <strong>Je complète le formulaire</strong> et{" "}
                      <a
                        target="_blank"
                        title="Je Candidate"
                        href="https://www.demarches-simplifiees.fr/commencer/monpsy"
                        rel="noreferrer"
                      >
                        dépose les pièces justificatives
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-lg">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">2</strong>
                  <h3 className="fr-card__title fr-mb-4w">Éligibilité</h3>
                  <div className="fr-card__desc">
                    <p>
                      <strong>Des experts analysent l’éligibilité :</strong>
                    </p>
                    <ul className="align-left no-bullet">
                      <li>- psychologue inscrit au registre ADELI</li>
                      <li>- parcours consolidé en psychologie clinique</li>
                      <li>- au moins 3 ans d’expérience clinique</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-lg">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">3</strong>
                  <h3 className="fr-card__title fr-mb-4w">Conventionnement </h3>
                  <div className="fr-card__desc">
                    <p>
                      Si mon dossier est éligible, il est{" "}
                      <strong>transmis à la CPAM </strong> de mon département
                      d’exercice qui me conventionne
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-lg">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">4</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Publication sur l’annuaire{" "}
                  </h3>
                  <div className="fr-card__desc">
                    <p>
                      Dès avril&nbsp;2022, mes coordonnées sont{" "}
                      <strong>publiées sur le site</strong> monpsy.sante.gouv.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-lg">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">5</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Accueil des patients
                  </h3>
                  <div className="fr-card__desc">
                    <p>
                      Je peux recevoir des patients dans le cadre de
                      MonPsy&nbsp;!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <h2>Quel est le rôle du médecin&nbsp;?</h2>
              <p>
                Le médecin identifie les situations d’urgence, présentant un
                risque suicidaire ou avec des critères de gravité pour orienter
                vers une prise en charge adaptée&nbsp;: psychiatre, hôpital,
                structure spécialisée dans la prise en charge de psycho-trauma…
              </p>

              <p>
                C’est pourquoi, dans ce cadre,{" "}
                <strong>
                  le patient est nécessairement orienté par un médecin.
                </strong>
              </p>

              <p>
                Il peut s’agir, par exemple, d’un médecin traitant (généraliste,
                pédiatre, gériatre…), d’un médecin scolaire, de PMI (protection
                maternelle et infantile), des services de santé des universités
                ou encore d’un médecin hospitalier.
              </p>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
            <div className="fr-col-12">
              <h2>
                Quels patients vais-je recevoir dans le cadre du
                dispositif&nbsp;?
              </h2>
            </div>
            <div className="fr-col-12 fr-col-lg-3 align-center">
              <img
                src="/images/children-psy.svg"
                height="160"
                alt="Enfants illustration"
              />
            </div>
            <div className="fr-col-12 fr-col-lg-9">
              <p>
                <strong>Des enfants dès 3 ans et des adolescents</strong>{" "}
                présentant une situation de mal-être ou souffrance psychique
                d’intensité légère à modérée, qui a pu susciter l’inquiétude de
                l’entourage (famille, milieu scolaire, médecin, etc).
              </p>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-my-4w">
            <div className="fr-col-12 fr-col-lg-8">
              <p>
                <strong>Et des adultes</strong> en souffrance psychique
                d’intensité légère à modérée présentant&nbsp;:
              </p>
              <ul>
                <li>Soit un trouble anxieux</li>
                <li>Soit un trouble dépressif</li>
                <li>
                  Soit un mésusage lié à l’usage de tabac, d’alcool ou de
                  cannabis (hors dépendance)
                </li>
                <li>
                  Soit un trouble du comportement alimentaire (sans critères de
                  gravité).
                </li>
              </ul>
            </div>
            <div className="fr-col-6 fr-col-lg-2">
              <img
                src="/images/patient-woman.svg"
                height="280"
                alt="Patient femme illustration"
              />
            </div>
            <div className="fr-col-6 fr-col-lg-2">
              <img
                src="/images/patient-man.svg"
                height="300"
                alt="Patient homme illustration"
              />
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
            <div className="fr-callout fr-callout--pink-tuile fr-my-2w fr-p-4w fr-col-12 fr-col-lg-8">
              <p>
                <strong>Les patients en situation d’urgence</strong>, présentant
                un{" "}
                <strong>
                  risque suicidaire ou avec des critères de gravité
                </strong>{" "}
                (signes de décompensation psychiatrique aigus, par exemple)
                doivent être orientés sans délai vers le psychiatre ou des
                structures spécialisées.
              </p>

              <p>
                Pour plus de précisions, je me réfère au guide à destination des
                psychologues. (à venir)
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container--fluid fr-bg--light fr-py-4w">
          <div className="fr-container">
            <h2>
              Quelles sont les étapes de l’accompagnement du patient&nbsp;?
            </h2>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
            <div className="fr-col-10 fr-col-md fr-ml-md-4w">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">1</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Je reçois un patient en présentiel pour un entretien
                    d’évaluation{" "}
                  </h3>
                  <div className="fr-card__desc">
                    <p>
                      Le patient me présente le{" "}
                      <strong>courrier d’adressage</strong> de son médecin.
                    </p>

                    <p>
                      Lors d’une première séance remboursée, je réalise un
                      entretien d’évaluation pour{" "}
                      <strong>
                        déterminer le nombre de séances nécessaires
                      </strong>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-md">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">2</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    J’accompagne mon patient{" "}
                  </h3>
                  <div className="fr-card__desc">
                    <p>
                      En fonction de l’état de santé du patient, je réalise
                      ensuite jusqu’à 7 séances de suivi remboursées
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-md">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">3</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Je facture la séance directement au patient{" "}
                  </h3>
                  <div className="fr-card__desc">
                    <p>
                      <strong>Le patient me rémunère directement</strong> après
                      chaque séance ou à la fin de plusieurs séances (selon mon
                      choix).
                    </p>
                    <p>
                      40€ pour l’entretien d’évaluation et 30€ pour chaque
                      séance de suivi.
                    </p>

                    <p>
                      Je complète et lui remets une{" "}
                      <strong>feuille de soins</strong> pour qu’il soit
                      remboursé.
                    </p>

                    <p>
                      Certains patients n’avancent pas les frais (voir
                      ci-dessous).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-md fr-mr-md-4w">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">4</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    J’échange avec le médecin
                  </h3>
                  <div className="fr-card__desc">
                    <p>
                      A la fin de l’accompagnement, j’adresse au médecin, un{" "}
                      <strong>compte-rendu de fin de prise en charge</strong>.
                    </p>

                    <p>
                      <strong>En cas de non amélioration des symptômes</strong>,
                      une concertation avec le médecin et un psychiatre est
                      nécessaire pour prévoir la suite de la prise en charge.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
            <div className="fr-col-12">
              <h2>
                Dans quels cas, le patient ne me paie pas en fin de
                séance&nbsp;?
              </h2>
              <p className="fr-mb-1v">
                Pour les situations suivantes, le patient bénéficie du Tiers
                Payant obligatoire&nbsp;:
              </p>
              <ul>
                <li>Bénéficiaire de la Complémentaire Santé Solidaire (CSS)</li>
                <li>Bénéficiaire de l’Aide Médicale d’Etat (AME)</li>
                <li>
                  Soins en lien avec une maladie : Affection de Longue Durée
                  (ALD) ou accident causé par un tiers
                </li>
                <li>
                  Soins en lien avec une maternité (à partir du 6ème mois de
                  grossesse)
                </li>
                <li>
                  Soins en lien avec un accident du travail ou une maladie
                  professionnelle (AT-MP)
                </li>
              </ul>
              <p>
                Ces patients ne me paient pas en fin de séances, mais{" "}
                <strong>doivent signer la feuille de soins</strong>.
              </p>

              <p>
                Pour être rémunéré(e), j’envoie la feuille de soins papier
                complétée et signée par le patient, accompagnée du courrier
                d’adressage à l’organisme d’assurance maladie de mon patient.
              </p>

              <p>
                <strong>
                  Je suis alors rémunéré(e) directement par l’Assurance Maladie.
                </strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <p className="fr-text--lead">
                J’ai des questions&nbsp;?{" "}
                <a
                  href="/faq?tab=psychologue"
                  className="fr-link fr-fi-question-line fr-link--icon-left"
                >
                  Je consulte la FAQ
                </a>
              </p>
            </div>
            <div className="fr-col-12">
              <p className="fr-text--lead">
                Je souhaite accéder à la documentation&nbsp;?
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                  target="_blank"
                  href="/documents/MonPsy_Guide psychologue_2022.pdf"
                >
                  Guide pour les psychologues
                </a>
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                  target="_blank"
                  href="/documents/MonPsy_Livret_échelles évaluations_2022.pdf"
                >
                  Echelles d’évaluation
                </a>
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                  target="_blank"
                  href="/documents/MonPsy_Flyer-Feuille de soin_2022.pdf"
                >
                  Comment compléter une feuille de soins&nbsp;?
                </a>
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                  target="_blank"
                  href="/documents/MonPsy_Fiche-Memo_Psy.pdf"
                >
                  Fiche mémo pour les psychologues
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Page;
