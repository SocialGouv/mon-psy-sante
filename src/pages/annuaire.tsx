import React, { useEffect } from "react";

import Directory from "../components/Directory";

const Annuaire = () => {
  useEffect(() => {
    document.title = "MonPsySanté - Annuaire";
  }, []);

  return (
    <div className="fr-container">
      <Directory />
    </div>
  );
};

export default Annuaire;
