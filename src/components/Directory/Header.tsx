import { Callout, CalloutTitle } from "@dataesr/react-dsfr";
import React from "react";

const Header = () => {
  return (
    <div className="fr-mt-6w">
      <h1>Annuaire</h1>
      <h2>Trouver un psychologue partenaire près de chez soi.</h2>
      <p>
        Accéder rapidement aux coordonnées des psychologues partenaires du
        dispositif MonPsy.
        <br />
        La liste des psychologues partenaires est actualisée régulièrement.
      </p>
      <Callout className="fr-mb-4w fr-callout--pink-tuile">
        <CalloutTitle>A lire, avant de prendre rendez-vous :</CalloutTitle>
        <div className="fr-callout__text fr-text--md">
          <ul>
            <li>
              Une consultation préalable chez le médecin est{" "}
              <strong>obligatoire</strong> afin de bénéficier du remboursement.
            </li>
            <li>
              <strong>8 séances</strong> sont remboursées au maximum par année
              civile.
            </li>
            <li>
              Le souhait de certains psychologues{" "}
              <strong>d’accueillir des enfants et des adolescents</strong> est
              indiqué dans l’annuaire.
            </li>
            <li>
              Certains psychologues peuvent réaliser des{" "}
              <strong>séances de suivi à distance</strong>. La 1ère séance
              d’entretien initial est réalisée uniquement en présentiel.
            </li>
          </ul>
          <strong>
            Le jour de mon rendez-vous, j’apporte le courrier d’adressage rédigé
            par mon médecin
          </strong>{" "}
          (ainsi que mon attestation de Carte Vitale papier indiquant vos
          droits, si je bénéficie d’une exonération d’avance de frais).
        </div>
      </Callout>
    </div>
  );
};

export default Header;
