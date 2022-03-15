import { Container, Row } from "@dataesr/react-dsfr";
import Link from "next/link";
import React, { useState } from "react";

import HeadTag from "../components/HeadTag";
import VideoButton from "../components/VideoButton";

const Page = () => {
  const [video, setVideo] = useState("hide");
  return (
    <>
      <HeadTag
        title="MonPsy : Le dispositif de remboursement des séances chez le psychologue | Ministère de la Santé"
        description="MonPsy est un dispositif du Ministère de la Santé permettant à chacun de bénéficier de séances remboursées avec un psychologue conventionné avec l’Assurance Maladie."
        image="Psychologist-hero.svg"
      />
      <section>
        <Container>
          <Row justifyContent="center" alignItems="middle" className="fr-pb-8w">
            <div className="fr-col-12 fr-col-md-6">
              <h1>
                MonPsy&nbsp;
                <span className="fr-text--lead d-block fr-mt-3w">
                  <strong>A partir d’avril&nbsp;2022,</strong> l’accès à un
                  accompagnement psychologique pour tous (dès 3 ans)
                </span>
              </h1>
              <p className="fr-mt-10w">
                Sur orientation d’un médecin, jusqu’à 8 séances remboursées chez
                un psychologue partenaire.
              </p>
            </div>
            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-4">
              <img
                className="fr-mt-2w"
                src="/images/Psychologist-hero.svg"
                alt="En parler, c’est déjà se soigner"
              />
              {video === "hide" && (
                <VideoButton onClick={() => setVideo("show")} />
              )}
            </div>
          </Row>
          {video === "show" && (
            <Row
              justifyContent="center"
              alignItems="middle"
              className="fr-pb-8w"
            >
              <div className="fr-col-8">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video width="100%" controls autoPlay>
                  <source type="video/mp4" src="/images/Video-MonPsy.mp4" />
                </video>
              </div>
            </Row>
          )}
        </Container>
      </section>
      <section>
        <div className="fr-container--fluid fr-bg--light fr-py-10w">
          <Container>
            <Row justifyContent="center" gutters>
              <div className="fr-col-12 fr-col-md-3">
                <div className="fr-card fr-enlarge-link fr-pt-3w">
                  <div className="fr-card__body">
                    <h2 className="fr-card__title">
                      <Link href="/patients" passHref>
                        <a href="/patients" className="fr-card__link">
                          Je suis angoissé(e), déprimé(e)
                        </a>
                      </Link>
                    </h2>
                    <p className="fr-card__desc">
                      Bénéficiez de l’accompagnement d’un psychologue
                    </p>
                  </div>
                  <div className="fr-card__img">
                    <img
                      src="/images/patient-home.svg"
                      height="158"
                      width="65"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-3">
                <div className="fr-card fr-enlarge-link fr-pt-3w">
                  <div className="fr-card__body">
                    <h2 className="fr-card__title">
                      <Link href="/psychologues" passHref>
                        <a href="/psychologues" className="fr-card__link">
                          Je suis psychologue
                        </a>
                      </Link>
                    </h2>
                    <p className="fr-card__desc">
                      Rejoignez le réseau des psychologues partenaires
                    </p>
                  </div>
                  <div className="fr-card__img">
                    <img src="/images/psy-home.svg" height="158" alt="" />
                  </div>
                </div>
              </div>

              <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-3">
                <div className="fr-card fr-enlarge-link fr-pt-3w">
                  <div className="fr-card__body">
                    <h2 className="fr-card__title">
                      <Link href="/medecins" passHref>
                        <a href="/medecins" className="fr-card__link">
                          Je suis médecin
                        </a>
                      </Link>
                    </h2>
                    <p className="fr-card__desc">
                      Orientez au mieux vos patients
                    </p>
                  </div>
                  <div className="fr-card__img">
                    <img src="/images/doctor-home.svg" height="158" alt="" />
                  </div>
                </div>
              </div>
            </Row>
          </Container>
        </div>
        <div className="fr-container fr-callout fr-callout--pink-tuile fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
            <div className="fr-col-12 fr-col-md-5">
              <p>
                Le dispositif ne concerne pas les <strong>urgences</strong> et
                les personnes présentant un <strong>risque suicidaire</strong>.
              </p>
            </div>
            <div className="fr-col-12 fr-col-md-2 align-center">
              <span
                className="fr-fi-arrow-right-line fr-fi--lg"
                aria-hidden="true"
              />
            </div>

            <div className="fr-col-12 fr-col-md-5">
              <p>
                Si je suis en détresse et/ou j’ai des pensées suicidaires, je
                contacte sans attendre le <strong>3114</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container fr-py-6w">
          <div className="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
            <div className="fr-col-12">
              <h2>Services d’écoute anonymes et gratuits</h2>
            </div>
            <div className="fr-col-12 fr-col-md-4 fr-px-2w">
              <div className="align-center fr-my-2w fr-py-4w">
                <a
                  target="_blank"
                  className="fr-link"
                  title="3114"
                  href="https://www.3114.fr"
                  rel="noreferrer"
                >
                  <img
                    src="/images/logo-3114.svg"
                    alt="Logo 3114"
                    height="80"
                  />
                </a>
              </div>
              <p>
                Je suis en détresse et/ou j’ai des pensées suicidaires. Je veux
                aider un proche en souffrance.
              </p>
              <p>
                J’appelle le <a href="tel:3114">3114</a>, accessible 24h/24 et
                7j/7 gratuitement en France entière
              </p>
              <p>
                Un professionnel de soins formé spécifiquement à la prévention
                du suicide sera à mon écoute afin de faire le point et me
                proposer des ressources adaptées à mes besoins.
              </p>
            </div>
            <div className="fr-col-12 fr-col-md-4 fr-px-2w">
              <div className="align-center fr-my-2w">
                <a
                  target="_blank"
                  className="fr-link"
                  title="Fil santé jeunes"
                  href="https://www.filsantejeunes.com/"
                  rel="noreferrer"
                >
                  <img
                    src="/images/Filsantejeunes.jpg"
                    height="140"
                    alt="Logo Fil santé jeunes"
                  />
                </a>
              </div>
              <p>
                Permanence d’écoute téléphonique tous les jours de 9h à 23h pour
                les 12-25 ans sur les thèmes de la santé, de la sexualité, de
                l’amour, du mal être, etc.
              </p>

              <p>
                <a
                  target="_blank"
                  href="https://www.filsantejeunes.com/tchat-individuel"
                  rel="noreferrer"
                >
                  Chat individuel
                </a>{" "}
                ouvert tous les jours de 9 h à 22h
              </p>
            </div>
            <div className="fr-col-12 fr-col-md-4 fr-px-2w">
              <div className="align-center fr-my-2w">
                <a
                  target="_blank"
                  className="fr-link"
                  title="SOS Amitié"
                  href="https://www.sos-amitie.com/ "
                  rel="noreferrer"
                >
                  <img
                    src="/images/SOSAmitie.png"
                    height="140"
                    alt="Logo SOS Amitié"
                  />
                </a>
              </div>
              <p>
                Permanence d’écoute téléphonique 24h/24 et 7j/7 pour les
                personnes en détresse (tel&nbsp;:&nbsp;
                <a href="tel:+33972394050">
                  09&nbsp;72&nbsp;39&nbsp;40&nbsp;50
                </a>
                )
              </p>
              <a
                href="https://www.sos-amitie.com/chat/"
                target="_blank"
                rel="noreferrer"
              >
                Chat
              </a>
              du lundi au dimanche de 13h à 3h du matin.
            </div>
            <div className="fr-col-12">
              <h2>Information sur la santé mentale</h2>
            </div>
            <div className="fr-col-12 fr-col-lg-4">
              <div className="align-center fr-my-2w">
                <a
                  target="_blank"
                  className="fr-link"
                  title="Ameli"
                  href="https://www.ameli.fr/paris/assure/sante/themes/depression-troubles-depressifs"
                  rel="noreferrer"
                >
                  <img src="/images/cnam.png" alt="Logo CNAM" height="90" />
                </a>
              </div>
            </div>
            <div className="fr-col-12 fr-col-lg-4">
              <div className="align-center fr-my-2w">
                <a
                  target="_blank"
                  className="fr-link"
                  title="Psycom"
                  href="https://www.psycom.org/"
                  rel="noreferrer"
                >
                  <img
                    src="/images/Psycom.png"
                    height="140"
                    alt="Logo Psycom"
                  />
                </a>
              </div>
            </div>
            <div className="fr-col-12 fr-col-lg-4">
              <div className="align-center fr-my-2w">
                <a
                  target="_blank"
                  className="fr-link"
                  title="Santé publique France"
                  href="https://www.santepubliquefrance.fr/maladies-et-traumatismes/sante-mentale"
                  rel="noreferrer"
                >
                  <img
                    src="/images/Sante-publique-France-logo.svg"
                    height="140"
                    alt="Logo Santé publique France"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Page;
