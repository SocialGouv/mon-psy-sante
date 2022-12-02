import React from "react";

import Breadcrumb from "../components/Breadcrumb";
import Contact from "../components/Contact";
import HeadTag from "../components/HeadTag";

const contact = () => {
  return (
    <div className="fr-container">
      <HeadTag
        title="Nous contacter | MonParcoursPsy"
        description="Obtenir des informations sur le fonctionnement du dispositif accessible à tout public à partir de 3 ans ou en savoir plus sur les modalités de candidature pour les psychologues"
      />
      <Breadcrumb page="Nous contacter" />
      <Contact />
    </div>
  );
};

export default contact;
