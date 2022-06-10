import React from "react";

const Psychologist = () => {
  return (
    <div
      className="fr-callout fr-fi-information-line"
      data-test-id="psychologist-info"
    >
      <p className="fr-callout__text">
        Vous êtes un professionnel de santé ou un psychologue conventionné avec
        l&lsquo;Assurance Maladie, nous vous invitons à vous connecter sur votre
        espace{" "}
        <a href="https://espacepro.ameli.fr/" rel="noreferrer" target="_blank">
          ameli.pro
        </a>{" "}
        ou à appeler le{" "}
        <strong>36 08 (service gratuit + prix de l&lsquo;appel)</strong>.
      </p>
    </div>
  );
};

export default Psychologist;
