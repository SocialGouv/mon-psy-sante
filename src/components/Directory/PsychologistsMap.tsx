import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { Psychologist as PsychologistType } from "../../types/psychologist";
import Psychologist from "./Psychologist";

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

const PsychologistsMap = ({
  mapCenter,
  psychologists,
  selectPsychologist,
}: {
  mapCenter: any;
  psychologists: PsychologistType[];
  selectPsychologist?: (psychologist: PsychologistType) => void;
}) => {
  return (
    <MapContainer
      center={mapCenter}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <ChangeView center={mapCenter} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {psychologists
        .filter((psychologist) => psychologist.coordinates)
        .map((psychologist) => (
          <Marker
            eventHandlers={{
              click: () => {
                if (selectPsychologist) {
                  selectPsychologist(psychologist);
                }
              },
            }}
            key={psychologist.id}
            position={[
              psychologist.coordinates.coordinates[1],
              psychologist.coordinates.coordinates[0],
            ]}
          >
            {!selectPsychologist && (
              <Popup>
                <Psychologist psychologist={psychologist} />
              </Popup>
            )}
          </Marker>
        ))}
    </MapContainer>
  );
};

export default PsychologistsMap;
