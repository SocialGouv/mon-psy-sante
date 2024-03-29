import React, { useState } from "react";
import Modal from "react-modal";
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PsychologistTile
      selected={selected}
      className="fr-tile fr-tile--horizontal "
      onClick={() => onClick(psychologist)}
    >
      <Modal
        aria-labelledby="fr-modal-title-modal"
        id="fr-modal-1"
        ariaHideApp={false}
        isOpen={isOpen}
        style={{ overlay: { zIndex: 1000 } }}
        className="fr-modal fr-modal--opened"
      >
        <div className="fr-container fr-container--fluid fr-container-md">
          <div className="fr-grid-row fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
              <div className="fr-modal__body">
                <div className="fr-modal__header">
                  <button
                    className="fr-link--close fr-link"
                    title="Fermer la fenêtre modale"
                    aria-controls="fr-modal-1"
                    aria-label="Fermer la fenêtre modale"
                    onClick={() => setIsOpen(false)}
                  >
                    Fermer
                  </button>
                </div>
                <div className="fr-modal__content">
                  <h1 id="fr-modal-title-modal" className="fr-modal__title">
                    Pour prendre rendez-vous
                  </h1>
                  {psychologist.phone && (
                    <p className="fr-my-0">
                      <Icon
                        aria-hidden="true"
                        alt=""
                        className="fr-mr-1w"
                        height="18"
                        width="18"
                        src="/images/icones/phone-fill.svg"
                      />
                      {psychologist.phone}
                    </p>
                  )}
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

                      <a
                        href={psychologist.website}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Site internet
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="fr-tile__body">
        <div className="fr-tile__title ">
          <p className="fr-text--lead">
            {psychologist.firstName} {psychologist.lastName}
          </p>
        </div>
        {psychologist.cdsmsp && (
          <div className="fr-tile__desc">
            <p className="fr-my-0">
              <Icon
                aria-hidden="true"
                alt=""
                className="fr-mr-1w fr-mb-1v"
                height="18"
                width="18"
                src="/images/icones/home-fill.svg"
              />
              {psychologist.cdsmsp}
            </p>
          </div>
        )}
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
            {psychologist.addressAdditional && (
              <small className="d-block fr-text--sm fr-ml-3w">
                {psychologist.addressAdditional}
              </small>
            )}
          </p>
          {psychologist.secondAddress && (
            <p className="fr-my-0">
              <Icon
                aria-hidden="true"
                alt=""
                className="fr-mr-1w fr-mb-1v"
                height="18"
                width="18"
                src="/images/icones/map-pin-fill.svg"
              />
              {psychologist.secondAddress}
              {psychologist.secondAddressAdditional && (
                <small className="d-block fr-text--sm fr-ml-3w">
                  {psychologist.secondAddressAdditional}
                </small>
              )}
            </p>
          )}
          {psychologist.visible ? (
            <button
              className="fr-btn fr-btn--sm fr-btn--secondary fr-mt-1w"
              title="Voir le contact"
              onClick={() => setIsOpen(true)}
            >
              Voir le contact pour prendre rendez-vous
            </button>
          ) : (
            <p className="fr-badge fr-badge--no-icon fr-badge--sm fr-mt-2w">
              Aucune disponibilité actuellement
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
                alt=""
                className="fr-mr-1w fr-mb-1v"
                height="18"
                width="18"
                src="/images/icones/chat-fill.svg"
              />
              Autre(s) langue(s): {psychologist.languages}
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
    inset 0 -0.25rem 0 0 var(--green-tilleul-verveine-925);

  &:hover {
    background-color: var(--green-tilleul-verveine-975);
  }

  ${(props) =>
    css`
      ${props.selected
        ? "background: var(--green-tilleul-verveine-975); box-shadow: none; border: solid 3px var(--green-tilleul-verveine-925)"
        : ""}
    `}
`;

const Icon = styled.img`
  position: relative;
  top: 6px;
`;

export default Psychologist;
