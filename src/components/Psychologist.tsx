import { Card, CardDescription, CardTitle } from "@dataesr/react-dsfr";
import React from "react";

import { Psychologist as PsychologistType } from "../types/psychologist";
import { PsychologistWrapper } from "./Psychologist.styles";

const infos = [
  { label: "Adresse:", value: "address" },
  { label: "Téléphone:", value: "phone" },
  { label: "Accepte la téléconsultation", value: "teleconsultation" },
  { label: "Travail avec les enfants", value: "withChildren" },
];

const Psychologist = ({
  psychologist,
  onClick,
  selected,
}: {
  psychologist: PsychologistType;
  onClick: () => void;
  selected: boolean;
}) => {
  return (
    <PsychologistWrapper selected={selected} className="fr-mb-2w">
      <Card hasArrow={false} anchorAs="span" onClick={onClick}>
        <CardTitle as="h2">
          {psychologist.firstName} {psychologist.lastName}
        </CardTitle>
        <CardDescription as="div">
          {infos.map((info) => {
            const value = psychologist[info.value];
            return value ? (
              <p key={info.label} className="fr-my-1w">
                {info.label} {value}
              </p>
            ) : null;
          })}
        </CardDescription>
      </Card>
    </PsychologistWrapper>
  );
};

export default Psychologist;
