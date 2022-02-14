import React from "react";

import Contact from "../components/Contact";
import HeadTag from "../components/HeadTag";

const contact = () => {
  return (
    <div className="fr-container">
      <HeadTag
        title="MonPsy : Nous contacter"
        description="Obtenir des informations sur le fonctionnement du dispositif accessible à tout public à partir de 3 ans ou en savoir plus sur les modalités de candidature pour les psychologues"
      />
      <Contact />
    </div>
  );
};

export default contact;
