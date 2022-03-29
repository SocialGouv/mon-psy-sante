import React from "react";
import styled, { css } from "styled-components";

import { Psychologist as PsychologistType } from "../../types/psychologist";

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
        <div className="fr-tile__title ">
          <p className="fr-text--lead highlight">
            {psychologist.firstName} {psychologist.lastName}
          </p>
        </div>
        <div className="fr-tile__desc">
          <p className="fr-my-0">
            <Icon
              aria-hidden="true"
              alt=""
              className="fr-mr-1w fr-mb-1v"
              height="18"
              width="18"
              src="/images/icones/map-pin-fill.svg"
            />
            {psychologist.address}
          </p>
          <p className="fr-text--sm fr-text--bold fr-mt-1w">
            Pour prendre rendez-vous :
          </p>
          <p className="fr-my-0">
            <Icon
              aria-hidden="true"
              alt=""
              className="fr-mr-1w"
              height="18"
              width="18"
              src="/images/icones/phone-fill.svg"
            />
            {psychologist.phone}{" "}
          </p>
          {psychologist.email && (
            <p className="fr-my-0">
              <Icon
                aria-hidden="true"
                alt=""
                className="fr-mr-1w"
                height="18"
                width="18"
                src="/images/icones/mail-fill.svg"
              />
              <a
                href={`mailto:${psychologist.email}`}
                rel="noreferrer nofollow"
                target="_blank"
              >
                {psychologist.email}
              </a>
            </p>
          )}
          {psychologist.website && (
            <p className="fr-my-0">
              <Icon
                aria-hidden="true"
                alt=""
                className="fr-mr-1w"
                height="18"
                width="18"
                src="/images/icones/computer-line.svg"
              />

              <a href={psychologist.website} rel="noreferrer" target="_blank">
                Site internet
              </a>
            </p>
          )}
          <div className="fr-p-1w" />
          <p className="fr-my-0 text-grey">
            <Icon
              aria-hidden="true"
              alt=""
              className="fr-mr-1w fr-mb-1v"
              height="20"
              width="20"
              src="/images/icones/team-fill.svg"
            />
            Accompagne des {psychologist.public.toLowerCase()}
          </p>
          {psychologist.teleconsultation && (
            <p className="fr-my-0 text-grey">
              <Icon
                aria-hidden="true"
                alt=""
                className="fr-mr-1w fr-mb-1v"
                height="18"
                width="18"
                src="/images/icones/vidicon-fill.svg"
              />
              Possibilité de séances à distance
            </p>
          )}
          {psychologist.languages && (
            <p className="fr-my-0 text-grey">
              <Icon
                aria-hidden="true"
                title="Langue(s) parlée(s) en plus du français"
                alt=""
                className="fr-mr-1w fr-mb-1v"
                height="18"
                width="18"
                src="/images/icones/chat-fill.svg"
              />
              Langue(s): {psychologist.languages}
            </p>
          )}
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

const Icon = styled.img`
  position: relative;
  top: 6px;
`;

export default Psychologist;
