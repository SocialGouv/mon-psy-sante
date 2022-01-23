import { Button, Col } from "@dataesr/react-dsfr";
import React, { Dispatch, MutableRefObject, SetStateAction } from "react";

import { Coordinates } from "../../types/coordinates";
import { Psychologist as PsychologistType } from "../../types/psychologist";
import {
  Desktop,
  Psychologists,
  PsychologistWrapper,
} from "./Directory.styles";
import Psychologist from "./Psychologist";
import PsychologistsMap from "./PsychologistsMap";

const ResultsDesktop = ({
  psychologists,
  loadMorePsychologists,
  resultsRef,
  psychologistsRefs,
  selectedPsychologist,
  setSelectedPsychologist,
  mapCenter,
  setMapCenter,
}: {
  psychologists: PsychologistType[];
  loadMorePsychologists: () => void;
  resultsRef: MutableRefObject<any>;
  psychologistsRefs: any;
  selectedPsychologist: number;
  setSelectedPsychologist: Dispatch<SetStateAction<number>>;
  mapCenter: Coordinates;
  setMapCenter: Dispatch<SetStateAction<Coordinates>>;
}) => {
  const onClick = (psychologist: PsychologistType) => {
    setSelectedPsychologist(psychologist.id);
    setMapCenter({
      latitude: psychologist.coordinates.coordinates[1],
      longitude: psychologist.coordinates.coordinates[0],
    });
  };

  return (
    <Desktop>
      <Psychologists className="fr-col-6" ref={resultsRef}>
        {psychologists.map((psychologist) => (
          <div
            ref={psychologistsRefs.current[psychologist.id]}
            key={psychologist.id}
          >
            <PsychologistWrapper
              selected={selectedPsychologist === psychologist.id}
              className="fr-mb-2w"
              onClick={() => onClick(psychologist)}
            >
              <Psychologist psychologist={psychologist} />
            </PsychologistWrapper>
          </div>
        ))}
        <Button onClick={loadMorePsychologists}>Plus de psychologues</Button>
      </Psychologists>
      <Col n="6">
        {mapCenter && (
          <PsychologistsMap
            selectPsychologist={(psychologist) => {
              setSelectedPsychologist(psychologist.id);
              setMapCenter({
                latitude: psychologist.coordinates.coordinates[1],
                longitude: psychologist.coordinates.coordinates[0],
              });
              resultsRef.current.scrollTo({
                top:
                  psychologistsRefs.current[psychologist.id].current.offsetTop -
                  resultsRef.current.offsetTop,
              });
            }}
            mapCenter={[mapCenter.latitude, mapCenter.longitude]}
            psychologists={psychologists}
          />
        )}
      </Col>
    </Desktop>
  );
};

export default ResultsDesktop;
