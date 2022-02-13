import React from "react";

import { Psychologist as PsychologistType } from "../../types/psychologist";

const isWebsite = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$", // fragment locator
  "i"
);

const infos = [
  { label: "Adresse:", value: "address" },
  { label: "Téléphone:", value: "phone" },
  {
    label: "Email:",
    value: (psy) =>
      psy.email ? (
        <a href={`mailto:${psy.email}`} rel="noreferrer" target="_blank">
          {psy.email}
        </a>
      ) : null,
  },
  {
    label: "Site internet:",
    value: (psy) =>
      psy.website && isWebsite.test(psy.website) ? (
        <a href={psy.website} rel="noreferrer" target="_blank">
          {psy.website}
        </a>
      ) : null,
  },
  { label: "Possibilité de séances à distance", value: "teleconsultation" },
  {
    label: "Accompagnement des",
    value: (psy) => psy.public && psy.public.toLowerCase(),
  },
  { label: "Langue(s) parlée(s):", value: "languages" },
  { label: "Nom du CDS ou de la MSP:", value: "cdsmsp" },
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
