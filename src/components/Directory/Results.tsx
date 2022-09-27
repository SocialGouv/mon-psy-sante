import React, { Dispatch, MutableRefObject, SetStateAction } from "react";

import { trackEventClickOnPsychologistCard } from "../../services/matomo";
import { Coordinates } from "../../types/coordinates";
import { DistanceBasedOn } from "../../types/enums/psychologist";
import { Psychologist as PsychologistType } from "../../types/psychologist";
import { Desktop, Psychologists } from "./Directory.styles";
import Psychologist from "./Psychologist";
import PsychologistsMap from "./PsychologistsMap";

const Results = ({
  psychologists,
  resultsRef,
  psychologistsRefs,
  selectedPsychologist,
  setSelectedPsychologist,
  mapCenter,
  setMapCenter,
  mapZoom,
  setMapZoom,
}: {
  psychologists: PsychologistType[];
  resultsRef: MutableRefObject<any>;
  psychologistsRefs: any;
  selectedPsychologist: number;
  setSelectedPsychologist: Dispatch<SetStateAction<number>>;
  mapCenter: Coordinates;
  setMapCenter: Dispatch<SetStateAction<Coordinates>>;
  mapZoom: number;
  setMapZoom: Dispatch<SetStateAction<number>>;
}) => {
  const selectPsy = (psychologist: PsychologistType) => {
    const coordinates =
      psychologist.distanceBasedOn === DistanceBasedOn.SecondAddressCoordinates
        ? psychologist.secondAddressCoordinates
        : psychologist.coordinates;

    if (selectedPsychologist !== psychologist.id) {
      setSelectedPsychologist(psychologist.id);
      trackEventClickOnPsychologistCard({ psychologistId: psychologist.id });
    }
    if (coordinates) {
      setMapCenter({
        latitude: coordinates.coordinates[1],
        longitude: coordinates.coordinates[0],
      });
      setMapZoom(14);
    }
  };

  return (
    <Desktop>
      <Psychologists
        ref={resultsRef}
        role="grid"
        className="fr-col-12 fr-col-md-5 fr-mr-2w fr-mt-2w fr-mt-md-0"
      >
        {psychologists.map((psychologist) => (
          <div
            role="gridcell"
            ref={psychologistsRefs.current[psychologist.id]}
            key={psychologist.id}
            className="fr-mb-2w"
            aria-selected={selectedPsychologist === psychologist.id}
          >
            <Psychologist
              psychologist={psychologist}
              onClick={selectPsy}
              selected={selectedPsychologist === psychologist.id}
            />
          </div>
        ))}
      </Psychologists>
      <div className="fr-col-12 fr-col-md-7">
        {mapCenter && (
          <PsychologistsMap
            selectedPsychologist={selectedPsychologist}
            selectPsychologist={(psychologist) => {
              selectPsy(psychologist);
              resultsRef.current.scrollTo({
                top:
                  psychologistsRefs.current[psychologist.id].current.offsetTop -
                  resultsRef.current.offsetTop,
              });
            }}
            mapCenter={[mapCenter.latitude, mapCenter.longitude]}
            psychologists={psychologists}
            mapZoom={mapZoom}
          />
        )}
      </div>
    </Desktop>
  );
};

export default Results;
