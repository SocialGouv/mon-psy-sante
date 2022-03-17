import * as L from "leaflet";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

import { Psychologist as PsychologistType } from "../../types/psychologist";
import Psychologist from "./Psychologist";

function ChangeView({ center }) {
  const map = useMap();
  map.setView(center);
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
  const [zindex, setZindex] = useState(yellowIcon);
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
      key={psychologist.id}
      position={[
        psychologist.coordinates.coordinates[1],
        psychologist.coordinates.coordinates[0],
      ]}
      // @ts-ignore
      icon={icon}
      zIndexOffset={zindex}
    >
      {!selectPsychologist && (
        <Popup>
          <Psychologist psychologist={psychologist} />
        </Popup>
      )}
    </Marker>
  );
}

const PsychologistsMap = ({
  mapCenter,
  psychologists,
  selectPsychologist,
  selectedPsychologist,
}: {
  mapCenter: any;
  psychologists: PsychologistType[];
  selectPsychologist?: (psychologist: PsychologistType) => void;
  selectedPsychologist: number;
}) => {
  return (
    <MapContainer
      center={mapCenter}
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%", minHeight: "300px" }}
    >
      <ChangeView center={mapCenter} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
