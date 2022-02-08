import Link from "next/link";
import React from "react";

import HeadTag from "../components/HeadTag";

const Page = () => (
  <>
    <HeadTag
      title="MonPsy : Le dispositif de remboursement des séances chez le psychologue"
      description="MonPsy s’adresse à toute la population à partir de 3 ans présentant des troubles psychiques d’intensité légère à modérée. Dès avril&nbsp;2022, sur orientation d’un médecin, les patients (enfants, adolescents et adultes) pourront bénéficier de séances assurées par des psychologues volontaires conventionnés avec l’Assurance Maladie."
      image="Psychologist-hero.svg"
    />
    <section>
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-pb-8w">
          <div className="fr-col-12 fr-col-md-6">
            <h1>MonPsy</h1>
            <p className="fr-text--lead">
              <strong>A partir d’avril&nbsp;2022,</strong> l’accès à un
              accompagnement psychologique pour tous (dès 3 ans)
            </p>
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

            <button className="fr-btn fr-btn--lg fr-fi-play-line fr-btn--icon-left fr-btn--secondary fr-mt-2w">
              Découvrir MonPsy en vidéo
            </button>
            <span className="d-block">Durée : </span>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div className="fr-container--fluid fr-bg--light fr-py-10w">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
            <div className="fr-col-12 fr-col-md-3">
              <div className="fr-card fr-enlarge-link fr-pt-3w">
                <div className="fr-card__body">
                  <h4 className="fr-card__title">
                    <Link href="/patients" passHref>
                      <a href="/patients" className="fr-card__link">
                        Je suis angoissé.e, déprimé.e
                      </a>
                    </Link>
                  </h4>
                  <p className="fr-card__desc">
                    Bénéficiez de l’accompagnement d’un psychologue
                  </p>
                </div>
                <div className="fr-card__img">
                  <img src="/images/patient-home.svg" alt="" />
                </div>
              </div>
            </div>

            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-3">
              <div className="fr-card fr-enlarge-link fr-pt-3w">
                <div className="fr-card__body">
                  <h4 className="fr-card__title">
                    <Link href="/psychologues" passHref>
                      <a href="/psychologues" className="fr-card__link">
                        Je suis psychologues
                      </a>
                    </Link>
                  </h4>
                  <p className="fr-card__desc">
                    Rejoignez le réseau des psychologues partenaires
                  </p>
                </div>
                <div className="fr-card__img">
                  <img src="/images/psy-home.svg" alt="" />
                </div>
              </div>
            </div>

            <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-3">
              <div className="fr-card fr-enlarge-link fr-pt-3w">
                <div className="fr-card__body">
                  <h4 className="fr-card__title">
                    <Link href="/medecins" passHref>
                      <a href="/medecins" className="fr-card__link">
                        Je suis médecin
                      </a>
                    </Link>
                  </h4>
                  <p className="fr-card__desc">
                    Participez au dispositif en orientant au mieux vos patients
                  </p>
                </div>
                <div className="fr-card__img">
                  <img src="/images/doctor-home.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fr-container fr-callout fr-callout--pink-tuile fr-my-6w">
        <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
          <div className="fr-col-12 fr-col-md-5">
            <p>
              Le dispositif ne concerne pas les urgences et les personnes
              présentant un risque suicidaire.
            </p>
          </div>
          <div className="fr-col-12 fr-col-md-2 fr-centered">
            <span
              className="fr-fi-arrow-right-line fr-fi--lg"
              aria-hidden="true"
            />
          </div>

          <div className="fr-col-12 fr-col-md-5">
            <p>
              Si je suis en détresse et/ou j’ai des pensées suicidaires, je
              contacte sans attendre le 3114
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
            <div className="fr-centered fr-my-2w fr-py-4w">
              <img src="/images/logo-3114.svg" alt="Logo 3114" height="80" />
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
              Un professionnel de soins formé spécifiquement à la prévention du
              suicide sera à mon écoute afin de faire le point et me proposer
              des ressources adaptées à mes besoins.
            </p>
          </div>
          <div className="fr-col-12 fr-col-md-4 fr-px-2w">
            <div className="fr-centered fr-my-2w">
              <img
                src="/images/Filsantejeunes.jpg"
                height="140"
                alt="Logo Fil santé jeunes"
              />
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
            <div className="fr-centered fr-my-2w">
              <img
                src="/images/SOSAmitie.png"
                height="140"
                alt="Logo SOS Amitié"
              />
            </div>
            <p>
              Permanence d’écoute téléphonique 24h/24 et 7j/7 pour les personnes
              en détresse (tel: <a href="tel:+33972394050"> 09 72 39 40 50</a>)
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
          <div className="fr-col-4">
            <div>
              <p>
                <div className="fr-centered fr-my-2w">
                  <img
                    src="/images/Psycom.png"
                    height="140"
                    alt="Logo Psycom"
                  />
                </div>
              </p>
            </div>
          </div>
          <div className="fr-col-4 fr-col-offset-1">
            <div>
              <p>
                <div className="fr-centered fr-my-2w">
                  <img
                    src="/images/Sante-publique-France-logo.svg"
                    height="140"
                    alt="Logo Santé publique France"
                  />
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);
export default Page;
