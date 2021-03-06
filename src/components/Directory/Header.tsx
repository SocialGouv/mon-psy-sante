import React from "react";

const Header = () => {
  return (
    <div className="fr-mt-6w">
      <h1>Annuaire</h1>
      <h2>Trouver un psychologue partenaire près de chez soi.</h2>
      <p className="fr-text--sm">
        La liste des psychologues partenaires est actualisée régulièrement.
      </p>
      <div className="fr-callout fr-fi-information-line fr-mb-4w fr-callout--pink-tuile">
        <p className="fr-callout__title">À noter</p>
        <div className="fr-callout__text fr-text--md">
          <ul>
            <li>
              Une orientation préalable par un médecin est{" "}
              <strong>obligatoire</strong>. Elle se traduit par la remise d’un
              courrier d’adressage nécessaire pour pouvoir bénéficier d’un
              remboursement.
            </li>
            <li>
              <strong>8 séances</strong> sont remboursées au maximum par année
              civile.
            </li>
            <li>
              Certains psychologues peuvent réaliser des{" "}
              <strong>séances de suivi à distance</strong>. La 1ère séance
              d’entretien initial est réalisée uniquement en présentiel.
            </li>
            <li>
              <strong>
                Le jour du rendez-vous, pensez à apporter le courrier
                d’adressage rédigé par un médecin
              </strong>{" "}
              (ainsi que l’attestation de Carte Vitale papier indiquant les
              droits, en cas d’exonération d’avance de frais).
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
