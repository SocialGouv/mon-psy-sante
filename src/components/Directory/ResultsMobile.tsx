import React from "react";

import { Coordinates } from "../../types/coordinates";
import { Psychologist as PsychologistType } from "../../types/psychologist";
import { Mobile } from "./Directory.styles";
import PsychologistsMap from "./PsychologistsMap";

const ResultsDesktop = ({
  psychologists,
  mapCenter,
}: {
  psychologists: PsychologistType[];
  mapCenter: Coordinates;
}) => {
  return (
    <Mobile>
      {mapCenter && (
        <PsychologistsMap
          mapCenter={[mapCenter.latitude, mapCenter.longitude]}
          psychologists={psychologists}
        />
      )}
    </Mobile>
  );
};

export default ResultsDesktop;
