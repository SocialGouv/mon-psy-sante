import React from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import { Psychologist } from "../types/psychologist";

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
  psychologists: Psychologist[];
  selectPsychologist: (psychologist: Psychologist) => void;
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
              click: () => selectPsychologist(psychologist),
            }}
            key={psychologist.id}
            position={[
              psychologist.coordinates.coordinates[1],
              psychologist.coordinates.coordinates[0],
            ]}
          />
        ))}
    </MapContainer>
  );
};

export default PsychologistsMap;
