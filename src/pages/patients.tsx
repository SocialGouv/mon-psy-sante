import { Button } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React, { useState } from "react";

import HeadTag from "../components/HeadTag";
import VideoButton from "../components/VideoButton";

const Page = () => {
  const router = useRouter();
  const [video, setVideo] = useState("hide");

  return (
    <>
      <HeadTag
        title="Enfant ou Adulte : bénéficier d’un soutien psychologique | MonPsy"
        description="Vous vous sentez angoissé(e), déprimé(e), consultez votre médecin. Il peut vous proposer un accompagnement psychologique remboursé MonPsy. A partir de 3 ans."
        image="patient.svg"
      />
      <section>
        <div className="fr-container fr-mt-4w fr-mb-8w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row--middle">
            <div className="fr-col-12 fr-col-lg-8">
              <h1>Je ne me sens pas bien</h1>
              <p>Je souhaite bénéficier de l’accompagnement d’un psychologue</p>
              <div className="fr-highlight fr-highlight--yellow-tournesol fr-mt-4w fr-pr-6w">
                <p>
                  <strong>Toute personne angoissée ou déprimée</strong> (dès 3
                  ans) peut bénéficier d’un accompagnement par un psychologue
                  partenaire (conventionné avec l’Assurance Maladie)&nbsp;:
                  jusqu’à 8 séances par an.
                </p>
                <p className="fr-mt-2w">
                  Pour en bénéficier, je dois{" "}
                  <strong>
                    nécessairement être orienté(e) par un médecin.
                  </strong>
                </p>
              </div>
            </div>
            <div className="fr-col-12 fr-col-lg-4">
              <img
                src="/images/patient.svg"
                height="360"
                alt="Je ne me sens pas bien illustration"
              />
              {video === "hide" && (
                <VideoButton onClick={() => setVideo("show")} />
              )}
            </div>
          </div>
          {video === "show" && (
            <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-pb-8w">
              <div className="fr-col-8">
                <video width="100%" controls autoPlay>
                  <source type="video/mp4" src="/images/Video-MonPsy.mp4" />
                  <track
                    default
                    kind="captions"
                    srcLang="fr"
                    src="/images/Video-MonPsy.mp4.vtt"
                  />
                </video>
              </div>
            </div>
          )}
        </div>
      </section>
      <section>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-lg-6">
              <h2>Quel est le rôle du médecin&nbsp;?</h2>
              <p>
                Le médecin identifie les <strong>situations d’urgence</strong>,
                présentant un <strong>risque suicidaire</strong> ou avec des{" "}
                <strong>critères de gravité</strong> pour orienter vers une
                prise en charge adaptée&nbsp;: psychiatre, hôpital, structure
                spécialisée dans la prise en charge de psycho-trauma…
              </p>
              <p>
                C’est pourquoi, dans ce cadre,{" "}
                <strong>
                  je dois nécessairement être orienté(e) par un médecin.
                </strong>
              </p>
              <p>
                Il peut s’agir, par exemple, de votre médecin (généraliste,
                pédiatre, gériatre….), d’un médecin scolaire, de PMI (protection
                maternelle et infantile), des services de santé des universités
                ou encore d’un médecin hospitalier.
              </p>
            </div>
            <div className="fr-col-12 fr-col-lg-6">
              <h2>Quel est le rôle du psychologue partenaire&nbsp;?</h2>
              <p className="fr-m-0">
                Je me sens anxieux(se), angoissé(e) ou déprimé(e)&nbsp;?
              </p>
              <p className="fr-m-0">Je suis en situation de mal-être&nbsp;?</p>
              <p className="fr-m-0">
                J’ai un problème de consommation de tabac, d’alcool ou de
                cannabis&nbsp;?
              </p>
              <p>J’ai un trouble du comportement alimentaire&nbsp;?</p>
              <p className="fr-text--lead">
                Le psychologue partenaire est là pour m’aider.
              </p>
              <p>
                Dans ce cadre, il ne gère pas les situations d’urgence,
                présentant un risque suicidaire ou avec des critères de gravité
                ou de dépendance.
              </p>
              <div>
                <p>
                  <strong>
                    Je trouve un psychologue partenaire près de chez moi
                  </strong>
                </p>
                <Button
                  icon="fr-fi-search-line"
                  onClick={() => router.push("/annuaire")}
                >
                  Trouver un psychologue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container--fluid fr-bg--light fr-py-4w">
          <div className="fr-container">
            <h2>Quelles sont les étapes de mon accompagnement&nbsp;?</h2>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-px-3w">
            <div className="fr-col-10 fr-col-lg">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">1</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Je prends rendez-vous avec mon médecin
                  </h3>
                  <div className="fr-card__desc">
                    <p>Je ne me sens pas bien.</p>
                    <p>
                      Le médecin <strong>évalue mon état de santé.</strong>
                    </p>
                    <p>Il peut m’orienter vers un psychologue partenaire.</p>
                    <p>
                      Il me remet un <strong>courrier d’adressage.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-lg">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">2</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Je prends rendez-vous chez un psychologue partenaire
                  </h3>
                  <div className="fr-card__desc">
                    <p>
                      Je contacte un psychologue partenaire de{" "}
                      <a href="/annuaire" rel="nofollow">
                        l’annuaire MonPsy
                      </a>
                      .
                    </p>
                    <p>
                      Je peux choisir un psychologue qui réalise des séances à
                      distance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-lg">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">3</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Je bénéficie d’un accompagnement psychologique
                  </h3>
                  <div className="fr-card__desc">
                    <p>
                      Lors de l’entretien d’évaluation,{" "}
                      <strong>
                        je présente au psychologue le courrier d’adressage du
                        médecin
                      </strong>
                      .
                    </p>
                    <p>
                      Je peux ensuite réaliser, en fonction de mon état de
                      santé, <strong>jusqu’à 7 séances de suivi</strong>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-lg">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">4</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Je règle le psychologue
                  </h3>
                  <div className="fr-card__desc">
                    <p>
                      <strong>Je paie directement le psychologue</strong> 40€
                      pour l’entretien d’évaluation et 30€ pour chaque séance de
                      suivi.
                    </p>
                    <p>
                      Le psychologue me remet{" "}
                      <strong>une feuille de soins.</strong>
                    </p>
                    <p>
                      Dans certains cas, je n’avance pas les frais (voir
                      ci-dessous)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-lg">
              <div className="fr-card align-center fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">5</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Je suis remboursé(e)
                  </h3>
                  <div className="fr-card__desc">
                    <p>
                      <strong>
                        J’envoie la feuille de soins et le courrier d’adressage
                        à mon organisme d’assurance maladie
                      </strong>{" "}
                      (après chaque séance ou à la fin de plusieurs séances).
                    </p>
                    <p>
                      Je suis remboursé(e) par mon organisme d’assurance maladie
                      (60%) et par ma complémentaire ou ma mutuelle (40%).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
            <div className="fr-col-12">
              <p>
                <strong>A la fin de l’accompagnement&nbsp;: </strong>
              </p>
              <ul>
                <li>
                  Avec mon accord, mon médecin et mon psychologue échangent
                  entre eux pour faire le point sur ma situation et m’orienter
                  au mieux.
                </li>
                <li>
                  En cas de non amélioration, mon médecin m’oriente vers la
                  prise en charge la plus adaptée: centre médico-psychologique
                  (CMP), CMP infanto-juvéniles, psychiatre (en libéral ou à
                  l’hôpital), maison des adolescents…
                </li>
                <li>
                  Je peux également décider de poursuivre avec mon psychologue
                  dans un cadre non remboursé.
                </li>
              </ul>
              <p>
                Au cours de ma vie, si j’en ai de nouveau besoin, je consulte
                mon médecin qui saura m’aider (possibilité d’une nouvelle
                orientation vers un psychologue).
              </p>
              <p className="fr-text--lead">
                J’ai des questions&nbsp;?{" "}
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left"
                  target="_blank"
                  href="/documents/MonPsy_Flyer grand public.pdf"
                >
                  Flyer Grand Public
                </a>
                <a
                  href="/faq?tab=patient"
                  className="fr-link fr-fi-question-line fr-link--icon-left"
                >
                  Je consulte la FAQ
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container fr-callout fr-callout--pink-tuile fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
            <div className="fr-col-12">
              <h2>
                Dans quels cas, je n’ai pas besoin d’avancer de frais&nbsp;?
              </h2>
              <p>Je suis dans une des situations suivantes&nbsp;:</p>
              <ul>
                <li>Bénéficiaire de la Complémentaire Santé Solidaire (CSS)</li>

                <li>Bénéficiaire de l’Aide Médicale d’Etat (AME)</li>

                <li>Soins en lien avec une Affection de Longue Durée (ALD)</li>

                <li>
                  Soins en lien avec une maternité (à partir du 6ème mois de
                  grossesse)
                </li>

                <li>
                  Soins en lien avec un accident du travail ou une maladie
                  professionnelle (AT-MP)
                </li>
              </ul>

              <p className="fr-mb-2w">
                Mon médecin précise sur le courrier d’adressage que je suis dans
                une des trois dernières situations (des soins en lien avc une
                maladie, une maternité ou un AT-MP) et que je ne fais pas
                l’avance des frais.
              </p>
              <p className="fr-mb-2w">
                J’apporte, lors de la première séance chez le psychologue, mon
                attestation de droits à jour et je donne au psychologue le
                courrier d’adressage de mon médecin.
              </p>
              <p className="fr-mb-2w">
                A la fin de chaque séance, je signe la feuille de soins.
              </p>
              <p className="fr-mb-2w">
                Le psychologue est rémunéré directement par mon organisme
                d’assurance maladie.
              </p>
              <p>
                <strong>Je n’ai rien à régler à la fin de la séance.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <h2>J’ai moins de 18 ans </h2>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
            <div className="fr-col-12 fr-col-lg-8">
              <p>
                <strong>
                  Le médecin doit demander l’accord des titulaires de l’autorité
                  parentale (des parents ou tuteurs){" "}
                </strong>{" "}
                avant de m’orienter vers un accompagnement psychologique.
              </p>
              <p>
                Je peux identifier sur l’annuaire les psychologues partenaires
                qui souhaitent recevoir des enfants et des adolescents.
              </p>
              <p>
                Mes parents ou tuteurs peuvent m’accompagner chez le
                psychologue.
              </p>
            </div>
            <div className="fr-col-12 fr-col-lg-4 align-center">
              <img
                src="/images/children.svg"
                height="250"
                alt="Je ne me sens pas bien illustration"
              />
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-mt-4w">
            <div className="fr-col-12 fr-col-lg-3">
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
            <div className="fr-col-12 fr-col-lg-9">
              <p>
                <strong>J’ai plus de 12 ans,</strong> je peux aller directement
                sur{" "}
                <a
                  href="https://www.filsantejeunes.com/ca-va-pas/mal-etre"
                  target="_blank"
                  rel="noreferrer"
                >
                  filsantejeunes.com/mal-etre
                </a>{" "}
                pour discuter en ligne ou par téléphone avec des personnes
                disponibles pour m’écouter.
              </p>

              <p>
                Service gratuit et anonyme ouvert tous les jours de 9h à 23h.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <p className="fr-text--lead">
                J’ai des questions&nbsp;?{" "}
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left"
                  target="_blank"
                  href="/documents/MonPsy_Flyer grand public.pdf"
                >
                  Flyer Grand Public
                </a>
                <a
                  href="/faq?tab=patient"
                  className="fr-link fr-fi-question-line fr-link--icon-left"
                >
                  Je consulte la FAQ
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Page;
