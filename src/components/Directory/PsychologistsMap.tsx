import * as L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

import { Psychologist as PsychologistType } from "../../types/psychologist";

function ChangeView({ center, mapZoom }) {
  const map = useMap();
  map.setView(center, mapZoom);
  return null;
}

const orangeIcon = new L.Icon({
    iconAnchor: [28, 56],
    iconSize: [56, 56],
    iconUrl: "/images/icones/marker-icon-big.svg",
  }),
  yellowIcon = new L.Icon({
    iconAnchor: [21, 42],
    iconSize: [42, 42],
    iconUrl: "/images/icones/marker-icon.svg",
  });

function MarkerWithIcon({
  selectPsychologist,
  psychologist,
  selectedPsychologist,
}) {
  const [icon, setIcon] = useState(yellowIcon);
  const [zindex, setZindex] = useState(1);
  useEffect(() => {
    if (selectedPsychologist === psychologist.id) {
      setIcon(orangeIcon);
      setZindex(100);
    } else {
      setIcon(yellowIcon);
      setZindex(1);
    }
  }, [selectedPsychologist, psychologist.id]);

  return (
    <Marker
      eventHandlers={{
        click: () => {
          if (selectPsychologist) {
            selectPsychologist(psychologist);
          }
        },
      }}
      position={[
        psychologist.coordinates.coordinates[1],
        psychologist.coordinates.coordinates[0],
      ]}
      // @ts-ignore
      icon={icon}
      zIndexOffset={zindex}
    />
  );
}

const PsychologistsMap = ({
  mapCenter,
  psychologists,
  selectPsychologist,
  selectedPsychologist,
  mapZoom,
}: {
  mapCenter: [number, number];
  psychologists: PsychologistType[];
  selectPsychologist?: (psychologist: PsychologistType) => void;
  selectedPsychologist: number;
  mapZoom: number;
}) => {
  return (
    <MapContainer
      center={mapCenter}
      zoom={mapZoom}
      scrollWheelZoom={false}
      style={{ height: "100%", minHeight: "300px", width: "100%" }}
    >
      <ChangeView center={mapCenter} mapZoom={mapZoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {psychologists
        .filter((psychologist) => psychologist.coordinates)
        .map((psychologist) => (
          <MarkerWithIcon
            key={psychologist.id}
            selectPsychologist={selectPsychologist}
            psychologist={psychologist}
            selectedPsychologist={selectedPsychologist}
          />
        ))}
    </MapContainer>
  );
};

export default PsychologistsMap;
