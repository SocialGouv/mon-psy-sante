import { useRouter } from "next/router";
import React, { useEffect } from "react";

import Directory from "../components/Directory";

export default () => {
  const router = useRouter();
  useEffect(() => {
    if (!process.env.DISPLAY_DIRECTORY) {
      router.push("/");
    }

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
