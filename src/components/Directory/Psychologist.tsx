import React from "react";

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

const Psychologist = ({ psychologist }: { psychologist: PsychologistType }) => {
  return (
    <>
      <h2>
        {psychologist.firstName} {psychologist.lastName}
      </h2>
      <div>
        {infos.map((info) => {
          const value =
            typeof info.value === "string"
              ? psychologist[info.value]
              : info.value(psychologist);
          return value ? (
            <p key={info.label} className="fr-my-1w">
              {info.label} {value}
            </p>
          ) : null;
        })}
      </div>
    </>
  );
};

export default Psychologist;
