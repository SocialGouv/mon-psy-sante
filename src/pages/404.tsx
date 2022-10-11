import React, { useEffect } from "react";

export default function Custom404() {
  useEffect(() => {
    document.title = "Page non trouvée | ParcoursPsy";
  }, []);

  return (
    <div className="fr-container fr-my-6w">
      <h1>404 - Page non trouvée</h1>
    </div>
  );
}
