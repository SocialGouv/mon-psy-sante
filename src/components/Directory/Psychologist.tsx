import React from "react";
import styled, { css } from "styled-components";

import { Psychologist as PsychologistType } from "../../types/psychologist";

const infos = [
  { label: "Adresse:", value: "address" },
  { label: "Téléphone:", value: "phone" },
  {
    label: "Email:",
    value: (psy) =>
      psy.email && (
        <a href={`mailto:${psy.email}`} rel="noreferrer" target="_blank">
          {psy.email}
        </a>
      ),
  },
  {
    label: "Site internet:",
    value: (psy) =>
      psy.website && (
        <a href={psy.website} rel="noreferrer" target="_blank">
          {psy.website}
        </a>
      ),
  },
  { label: "Possibilité de séances à distance", value: "teleconsultation" },
  {
    label: "Accompagnement des",
    value: (psy) => psy.public && psy.public.toLowerCase(),
  },
  {
    label: "Langue(s) parlée(s):",
    value: "languages",
  },
  { label: "Nom de la structure (CDS/MSP):", value: "cdsmsp" },
];

const Psychologist = ({
  psychologist,
  selected,
  onClick,
}: {
  psychologist: PsychologistType;
  selected?: boolean;
  onClick?: (psychologist: PsychologistType) => void;
}) => {
  return (
    <PsychologistTile
      selected={selected}
      className="fr-tile fr-tile--horizontal "
      onClick={() => onClick(psychologist)}
    >
      <div className="fr-tile__body">
        <p className="fr-tile__title">
          {psychologist.firstName} {psychologist.lastName}
        </p>
        <div className="fr-tile__desc">
          {infos.map((info) => {
            const value =
              typeof info.value === "string"
                ? psychologist[info.value]
                : info.value(psychologist);
            return (
              value && (
                <p key={info.label} className="fr-my-0">
                  {info.label} {value}
                </p>
              )
            );
          })}
        </div>
      </div>
    </PsychologistTile>
  );
};

const PsychologistTile = styled.div`
  cursor: pointer;
  box-shadow: inset 0 0 0 1px var(--border-default-grey),
    inset 0 -0.25rem 0 0 var(--pink-tuile-main-556);

  &:hover {
    background-color: var(--pink-tuile-950);
  }

  ${(props) =>
    css`
      ${props.selected ? "background: var(--pink-tuile-950)" : ""}
    `}
`;

export default Psychologist;
