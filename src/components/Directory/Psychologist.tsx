import React from "react";

import { Psychologist as PsychologistType } from "../../types/psychologist";

const infos = [
  { label: "Adresse:", value: "address" },
  { label: "Téléphone:", value: "phone" },
  {
    label: "Site internet:",
    value: (psy) =>
      psy.website ? (
        <a href={psy.website} rel="noreferrer" target="_blank">
          {psy.website}
        </a>
      ) : null,
  },
  { label: "Accepte la téléconsultation", value: "teleconsultation" },
  { label: "Travail avec les enfants", value: "withChildren" },
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
