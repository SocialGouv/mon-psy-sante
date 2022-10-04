import React from "react";

const Footer = () => {
  return (
    <section>
      <div className="fr-container--fluid fr-py-7w fr-bg--tilleul-light">
        <div className="fr-container">
          <h2>A retenir</h2>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-md-4">
              <h3 className="fr-text--dark-blue">
                Avant le RDV avec le psychologue
              </h3>
              <ul className="no-bullet">
                <li>
                  <strong>
                    <span
                      className="fr-fi-arrow-right-line fr-fi--md fr-text--dark-blue"
                      aria-hidden="true"
                    />{" "}
                    Vous prenez rendez-vous avec un médecin{" "}
                  </strong>{" "}
                  (généraliste, pédiatre, gériatre, spécialiste, médecin
                  scolaire, de PMI, des services de santé des universités ou
                  encore d’un médecin hospitalier).
                </li>
                <li>
                  <strong>
                    <span
                      className="fr-fi-arrow-right-line fr-fi--md fr-text--dark-blue"
                      aria-hidden="true"
                    />
                  </strong>{" "}
                  En cas d’imprévu, pensez à bien prévenir le psychologue de
                  votre désistement. En informant rapidement de votre absence,
                  vous permettez à un autre patient de bénéficier d’un suivi.
                </li>
              </ul>
            </div>
            <div className="fr-col-12 fr-col-md-4">
              <h3 className="fr-text--dark-blue">
                Le jour du RDV avec le psychologue
              </h3>
              <ul className="no-bullet">
                <li>
                  <span
                    className="fr-fi-arrow-right-line fr-fi--md fr-text--dark-blue"
                    aria-hidden="true"
                  />{" "}
                  <strong> Vous apportez le courrier d’adressage</strong> rédigé
                  par le médecin.
                </li>

                <li>
                  <span
                    className="fr-fi-arrow-right-line fr-fi--md fr-text--dark-blue"
                    aria-hidden="true"
                  />{" "}
                  Si vous n’avancez pas les frais en raison de soins en lien
                  avec une maladie, une maternité ou un AT-MP, vous apportez{" "}
                  <strong>votre attestation de droits à jour</strong>.
                </li>
                <li>
                  <span
                    className="fr-fi-arrow-right-line fr-fi--md fr-text--dark-blue"
                    aria-hidden="true"
                  />{" "}
                  Certains psychologues peuvent réaliser des séances de suivi à
                  distance excepté la première séance d’entretien initial réalisée{" "}
                  <strong>uniquement en présentiel</strong>.
                </li>
              </ul>
            </div>
            <div className="fr-col-12 fr-col-md-4">
              <h3 className="fr-text--dark-blue">
                Après le RDV avec le psychologue
              </h3>
              <ul className="no-bullet">
                <li>
                  <span
                    className="fr-fi-arrow-right-line fr-fi--md fr-text--dark-blue"
                    aria-hidden="true"
                  />{" "}
                  Vous envoyez la{" "}
                  <strong>
                    feuille de soins remise par le psychologue et le courrier
                    d’adressage
                  </strong>{" "}
                  de votre médecin, à votre organisme d’assurance maladie (sauf
                  si vous n’avez pas avancé les frais).
                </li>

                <li>
                  <span
                    className="fr-fi-arrow-right-line fr-fi--md fr-text--dark-blue"
                    aria-hidden="true"
                  />{" "}
                  8 séances sont remboursées au maximum par année civile. A la
                  fin de l’accompagnement, avec votre accord, le psychologue
                  adresse au médecin, un compte-rendu de fin de prise en charge.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
