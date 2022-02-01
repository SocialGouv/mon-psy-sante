import Head from "next/head";
import React from "react";

const Page = () => {
  return (
    <>
      <Head>
        <title>MonPsy pour les parents</title>
      </Head>
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-my-4w">
          <div className="fr-col-5 fr-col-offset-1 fr-pr-4w fr-pt-6w">
            <h1>Je suis parent</h1>
            <p>
              Je souhaite faire bénéficier mon enfant d’un soutien psychologique
            </p>
          </div>
          <div className="fr-col-3 fr-col-offset-2--right">
            <img
              className="hero"
              src="/static/images/parent.jpg"
              alt="En parler, c’est déjà se soigner"
            />
          </div>
        </div>
        <div>
          <div>
            <div className="fr-container--fluid fr-centered fr-pt-4w fr-pb-12w">
              <div className="fr-container">
                <div className="fr-grid-row fr-grid-row--center">
                  <div className="fr-col-xs-12">
                    <h2>Comment ça se passe&nbsp;?</h2>
                    <h3>Trois étapes indispensables</h3>
                  </div>
                </div>

                <div className="fr-grid-row fr-grid-row--center">
                  <div className="fr-col-xs-12 fr-col-md-3">
                    <div className="fr-centered fr-m-2w fr-px-2w fr-py-3w fr-bg--light card">
                      <div className="fr-bg--light-2 fr-p-1v fr-text--xl fr-m-auto step">
                        <span className="number">1.</span>
                      </div>
                      <div className="fr-p-2w">
                        <strong className="fr-text--lg fr-mb-2w">
                          Consultez un médecin
                        </strong>
                        <p>
                          Tout médecin peut orienter votre enfant vers un
                          accompagnement psychologique (le pédiatre, le médecin
                          généraliste, le médecin scolaire, celui du service de
                          PMI, de l’hôpital...)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="fr-col-xs-12 fr-col-md-3">
                    <div className="fr-centered fr-m-2w fr-px-2w fr-py-3w fr-bg--light card">
                      <div className="fr-bg--light-2 fr-p-1v fr-text--xl fr-m-auto step">
                        <span className="number">2.</span>
                      </div>
                      <div className="fr-p-2w">
                        <strong className="fr-text--lg fr-mb-2w">
                          Choisissez un psychologue
                        </strong>
                        <p>
                          Vous choisissez, parmi la liste des psychologues
                          partenaires, le professionnel qui accompagnera votre
                          enfant et vous.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="fr-col-xs-12 fr-col-md-3">
                    <div className="fr-centered fr-m-2w fr-px-2w fr-py-3w fr-bg--light card">
                      <div className="fr-bg--light-2 fr-p-1v fr-text--xl fr-m-auto step">
                        <span className="number">3.</span>
                      </div>
                      <div className="fr-p-2w">
                        <strong className="fr-text--lg fr-mb-2w">
                          Faites bénéficier votre enfant d’un suivi
                        </strong>
                        <p>
                          Vous prenez rendez-vous avec le psychologue choisi,
                          qui suivra votre enfant pendant 10 séances au maximum.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Page;
