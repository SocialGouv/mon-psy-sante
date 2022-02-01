import { Callout, CalloutText } from "@dataesr/react-dsfr";
import React from "react";

const Psychologist = () => {
  return (
    <Callout data-test-id="psychologist-info">
      <CalloutText>
        Vous êtes un professionnel de santé ou un psychologue conventionné avec
        l&lsquo;Assurance Maladie, nous vous invitons à vous connecter sur votre
        espace{" "}
        <a href="https://espacepro.ameli.fr/" rel="noreferrer" target="_blank">
          ameli.pro
        </a>{" "}
        ou à appeler le <b>36 08 (service gratuit + prix de l&lsquo;appel)</b>.
      </CalloutText>
    </Callout>
  );
};

export default Psychologist;
