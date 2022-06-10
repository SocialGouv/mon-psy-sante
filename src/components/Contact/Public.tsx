import React from "react";

const Public = () => {
  return (
    <div
      className="fr-callout fr-fi-information-line"
      data-test-id="public-info"
    >
      <p className="fr-callout__text">
        Vous êtes un patient et vous avez des questions sur votre prise en
        charge par l&lsquo;Assurance Maladie, vous pouvez appeler le{" "}
        <strong>36 46 (service gratuit + prix de l&lsquo;appel)</strong>.
      </p>
    </div>
  );
};

export default Public;
