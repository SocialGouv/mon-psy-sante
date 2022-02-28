import { Callout, CalloutText, CalloutTitle } from "@dataesr/react-dsfr";
import React from "react";

const Header = () => {
  return (
    <div>
      <h1>Annuaire</h1>
      <h2>Trouver un psychologue partenaire près de chez soi.</h2>
      <p>
        Accéder rapidement aux coordonnées des psychologues partenaires du
        dispositif MonPsy.
        <br />
        La liste des psychologues partenaires est actualisée régulièrement.
      </p>
      <Callout className="fr-mb-4w">
        <CalloutTitle>A lire, avant de prendre rendez-vous :</CalloutTitle>
        <CalloutText size="md">
          <ul>
            <li>
              Une consultation préalable chez le médecin est <b>obligatoire</b>{" "}
              afin de bénéficier du remboursement.
            </li>
            <li>
              <b>8 séances</b> sont remboursées au maximum par année civile
            </li>
            <li>
              Le souhait de certains psychologues{" "}
              <b>d’accueillir des enfants et des adolescents</b> est indiqué
              dans l’annuaire
            </li>
            <li>
              Certains psychologues peuvent réaliser des{" "}
              <b>séances de suivi à distance</b>. La 1ère séance d’entretien
              initial est réalisée uniquement en présentiel.
            </li>
          </ul>
          <b>
            Le jour de mon rendez-vous, j’apporte le courrier d’adressage rédigé
            par mon médecin
          </b>{" "}
          (ainsi que mon attestation de Carte Vitale papier indiquant vos
          droits, si je bénéficie d’une exonération d’avance de frais).
        </CalloutText>
      </Callout>
    </div>
  );
};

export default Header;
