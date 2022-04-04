import { Callout, CalloutText } from "@dataesr/react-dsfr";
import React from "react";

const Public = () => {
  return (
    <Callout data-test-id="public-info">
      <CalloutText>
        Vous êtes un patient et vous avez des questions sur votre prise en
        charge par l&lsquo;Assurance Maladie, vous pouvez appeler le{" "}
        <strong>36 46 (service gratuit + prix de l&lsquo;appel)</strong>.
      </CalloutText>
    </Callout>
  );
};

export default Public;
