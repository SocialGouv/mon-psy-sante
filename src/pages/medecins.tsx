import React, {useState} from "react";

import HeadTag from "../components/HeadTag";

const Page = () => {
  const [video, setVideo] = useState<"hide" | "show">("hide");
  return (
    <>
      <HeadTag
        title="Médecin : orienter mes patients vers le dispositif | MonPsy"
        description="Orientez vos patients en souffrance psychique d’intensité légère à modérée, vers « MonPsy », un accompagnement remboursé avec un psychologue conventionné."
        image="doctor.svg"
      />
      <section>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row--middle">
            <div className="fr-col-12 fr-col-lg-7">
              <h1>
                Vous êtes médecin,
                <span className="fr-text--lead d-block fr-mt-3w">
                  Prenez connaissance du cadre du dispositif
                </span>
              </h1>
              <a
                className="fr-btn fr-mb-4w"
                target="_blank"
                href="/documents/MonPsy_Flyer grand public.pdf"
                title="Réponse à vos questions en PDF"
                rel="noreferrer nofollow noopener"
              >
                Flyer de présentation
              </a>
            </div>
            <div className="fr-col-12 fr-col-lg-5 align-center">
              <img src="/images/doctor.svg" height="360" alt=""/>
              {video === "hide" && (
                <div className="align-left">
                  <button
                    onClick={() => setVideo("show")}
                    title="Découvrir MonPsy en vidéo, via le témoignage de M. Werner, médecin pédiatre"
                    className="fr-btn fr-btn--lg fr-btn--secondary fr-fi-play-line fr-btn--icon-left fr-mt-4w"
                  >
                    Découvrez le témoignage de M. Werner, médecin pédiatre
                  </button>
                  <span className="d-block fr-mt-1w">Durée&nbsp;: 2min</span>
                </div>
              )}
            </div>
            {video === "show" && (
              <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-pb-8w">
                <div className="fr-col-8">
                  <video width="100%" controls autoPlay>
                    <source type="video/mp4" src="/images/Video-Medecin.mp4"/>
                    <track
                      kind="captions"
                      srcLang="fr"
                      src="/images/Video-Medecin.mp4.vtt"
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
        <div className="fr-container--fluid fr-bg--light fr-my-4w fr-py-4w fr-px-2w">
          <div className="fr-container fr-mb-4w">
            <h2>De l’évaluation à l’orientation du patient </h2>
          </div>
          <div className="fr-grid-row fr-grid-row--center fr-md-px-3w">
            <div className="fr-col-12 fr-col-md-4">
              <div className="fr-card align-center fr-card--no-arrow fr-mx-1w">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">1</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Evaluez la santé du patient
                  </h3>
                  <div className="fr-card__desc align-left">
                    <p>
                      Vous évaluez l’état de santé du patient selon les critères
                      d’inclusion (cf.{" "}
                      <a
                        target="_blank"
                        rel="noreferrer nofollow noopener"
                        href="/documents/MonPsy_Fiche-Mémo_médecin_2022.pdf"
                      >
                        Fiche mémo
                      </a>
                      )&nbsp;:
                    </p>
                    <p>
                      <strong>
                        Enfants (de 3 ans ou plus) et adolescents en souffrance
                        psychique
                      </strong>
                    </p>
                    <ul>
                      <li>
                        Situation de mal être ou souffrance psychique pouvant
                        susciter l’inquiétude de l’entourage
                      </li>
                    </ul>
                    <p>
                      <strong>
                        Adultes de 18 ans ou plus en souffrance psychique
                      </strong>
                    </p>
                    <ul>
                      <li>Trouble anxieux d’intensité légère à modérée</li>
                      <li>Trouble dépressif d’intensité légère à modérée</li>
                      <li>Mésusage de tabac, d’alcool, de cannabis</li>
                      <li>
                        Trouble du comportement alimentaire sans critères de
                        gravité
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-12 fr-col-md-4">
              <div className="fr-card align-center fr-card--no-arrow fr-mx-1w">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">2</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Orientez le patient vers le dispositif
                  </h3>
                  <div className="fr-card__desc align-left">
                    <p>
                      Si le patient peut bénéficier du dispositif, vous lui
                      remettez&nbsp;:
                    </p>
                    <ul>
                      <li>
                        <strong>un courrier d’adressage</strong> nécessaire au
                        remboursement de 8 séances maximum. Le nombre de séances
                        est déterminé par le psychologue
                      </li>
                      <li>
                        <strong>un courrier d’accompagnement</strong> avec le
                        contexte, les éléments cliniques et le motif de
                        l’adressage à destination du psychologue partenaire du
                        dispositif.
                      </li>
                    </ul>
                    <p>
                      <strong>Un modèle</strong> de ces deux courriers est{" "}
                      <a
                        href="/documents/Courrier_d_adressage.docx"
                        target="_blank"
                        rel="noreferrer nofollow noopener"
                      >
                        accessible ici
                      </a>
                      .
                    </p>
                    <p>
                      Le cas échéant, vous vous assurez du{" "}
                      <strong>
                        consentement des titulaires de l’autorité parentale.
                      </strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-12 fr-col-md-4">
              <div className="fr-card align-center fr-card--no-arrow fr-mx-1w">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">3</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Échangez avec le psychologue
                  </h3>
                  <div className="fr-card__desc align-left">
                    <p>
                      A la fin de l’accompagnement, en accord avec le patient,
                      le psychologue vous adresse{" "}
                      <strong>un compte-rendu de fin de prise en charge</strong>
                      .
                    </p>
                    <p>
                      <strong>En cas de non amélioration des symptômes</strong>,
                      une concertation avec le psychologue et un psychiatre est
                      nécessaire pour prévoir&nbsp;:
                    </p>
                    <ul>
                      <li>une évaluation plus approfondie</li>
                      <li>
                        la nécessité d’une prise en charge plus adaptée&nbsp;:
                        Centre Médico-Psychologique (CMP), CMP
                        infanto-juvéniles, service de psychiatrie ou
                        pédopsychiatrie, maison des adolescents, …
                      </li>
                      <li>
                        un nouvel accompagnement psychologique dans la{" "}
                        <strong>
                          limite de 8 séances remboursées par année civile.
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
            <div className="fr-col-12">
              <h2>Vous êtes psychiatre</h2>
              <p>
                Le dispositif MonPsy est né d’une volonté partagée entre les
                acteurs de faciliter l’accès à une prise en charge psychologique
                de premier recours pour les patients souffrant de troubles
                d’intensité légère à modérée.
              </p>
              <p>
                A tout moment du parcours, le psychologue et le médecin pourront
                solliciter votre avis et vous adresser le patient si des
                indicateurs de gravité apparaissent. A la fin du parcours et en
                l’absence d’amélioration, vous êtes consulté par le médecin et
                le psychologue pour décider des suites de la prise en charge.
              </p>
              <p>
                Ce dispositif a pour vocation de favoriser la coordination entre
                les médecins, les psychologues et les psychiatres.
              </p>
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
                  rel="noreferrer nofollow noopener"
                  href="/documents/MonPsy_Guide médecin_2022.pdf"
                >
                  Guide pour les médecins
                </a>
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  href="/documents/MonPsy_Fiche-Mémo_médecin_2022.pdf"
                >
                  Fiche mémo pour les médecins
                </a>
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left fr-ml-2w"
                  target="_blank"
                  rel="noreferrer nofollow noopener"
                  href="/documents/MonPsy_Livret_échelles évaluations_2022.pdf"
                >
                  Échelles d’évaluation
                </a>
              </div>
            </div>
            <div>
              <strong className="fr-text--lg">Des questions&nbsp;?</strong>
              <a
                href="/faq?tab=medecin"
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
export default Page;
