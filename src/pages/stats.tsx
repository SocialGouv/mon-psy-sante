import React from "react";

import Breadcrumb from "../components/Breadcrumb";
import HeadTag from "../components/HeadTag";

const Stats = () => {
  return (
    <div className="fr-container">
      <HeadTag
        title="Statistiques | MonParcoursPsy"
        description="Statistiques d'utilisation du site"
      />
      <div>
        <Breadcrumb page="Statistiques d'utilisation du site" />
        <iframe
          src="https://matomo-metabase-monpsysante.fabrique.social.gouv.fr/public/dashboard/aff47619-c15c-42b7-84bc-98319283b5fb"
          seamless
          title="MonParcoursPsy Santé, statistiques"
          width="800"
          height="600"
          style={{ display: "block", margin: "0 auto", padding: "2rem 0" }}
          allowTransparency
        />
      </div>
    </div>
  );
};

export default Stats;
