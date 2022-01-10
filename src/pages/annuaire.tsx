import React, { useEffect } from "react";

import Directory from "../components/Directory";

const Annuaire = () => {
  useEffect(() => {
    document.title = "MonPsySanté - Annuaire";
  }, []);

  return (
    <div className="fr-container">
      <div className="fr-grid-row fr-grid-row--center">
        <Directory />
      </div>
    </div>
  );
};

export default Annuaire;
