import Head from "next/head";
import React from "react";

const Page = () => {
  return (
    <>
      <Head>
        <title>MonPsy pour les patients</title>
      </Head>
      <section>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row--middle">
            <div className="fr-col-8">
              <h1>Je suis angoissé(e) ou déprimé(e)</h1>
              <p>Je souhaite bénéficier de l’accompagnement d’un psychologue</p>
              <p className="fr-text--lead">
                Le dispositif MonPsy sera opérationnel à partir d’{" "}
                <strong>avril&nbsp;2022</strong>.
              </p>
              <div className="fr-highlight fr-highlight--yellow-tournesol fr-my-4w fr-py-2w fr-pr-6w">
                <p>
                  <strong>Toute personne angoissée ou déprimée</strong> (dès 3
                  ans) peut bénéficier d’un accompagnement par un psychologue
                  partenaire (conventionné avec l’Assurance Maladie): jusqu’à 8
                  séances par an.
                </p>
                <p className="fr-mt-2w">
                  Pour en bénéficier, je dois{" "}
                  <strong>
                    nécessairement être orienté(e) par un médecin.
                  </strong>
                </p>
              </div>
            </div>
            <div className="fr-col-3">
              <img
                src="/images/patient.svg"
                alt="Je suis angoissé(e) ou déprimé(e) illustration"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="fr-container fr-my-6w">
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-6">
              <h2>Quel est le rôle du médecin&nbsp;?</h2>
              <p>
                Le médecin identifie les <strong>situations d’urgence</strong>,
                présentant un <strong>risque suicidaire</strong> ou avec des
                <strong>critères de gravité</strong> pour orienter vers une
                prise en charge adaptée : psychiatre, hôpital, structure
                spécialisée dans la prise en charge de psycho-trauma…
              </p>
              <p>
                C’est pourquoi, dans ce cadre,{" "}
                <strong>
                  je dois nécessairement être orienté(e) par un médecin.
                </strong>
              </p>
              <p>
                Il peut s’agir, par exemple, de votre médecin traitant
                (généraliste, pédiatre, gériatre….), d’un médecin scolaire, de
                PMI (protection maternelle et infantile), des services de santé
                des universités ou encore d’un médecin hospitalier.
              </p>
            </div>
            <div className="fr-col-6">
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
              <div className="fr-callout fr-callout--pink-tuile fr-my-2w">
                <p>
                  Les coordonnées des psychologues partenaires, conventionnés
                  avec l’Assurance Maladie, seront disponibles à partir du
                  printemps 2022.
                </p>
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
          <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--center">
            <div className="fr-col-10 fr-col-lg-2">
              <div className="fr-card fr-centered fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">1</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Je prends rendez-vous avec mon médecin
                  </h3>
                  <div className="fr-card__desc">
                    <p> Je suis angoissé.e ou déprimé.e.</p>
                    <p>
                      Le médecin <strong>évalue mon état de santé.</strong>
                    </p>
                    <p> Il peut m’orienter vers un psychologue partenaire.</p>
                    <p>
                      Il me remet un <strong>courrier d’adressage.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-lg-2">
              <div className="fr-card fr-centered fr-card--no-arrow">
                <div className="fr-card__body">
                  <strong className="fr-display-xs">2</strong>
                  <h3 className="fr-card__title fr-mb-4w">
                    Je prends rendez-vous chez un psychologue partenaire
                  </h3>
                  <div className="fr-card__desc">
                    <p>
                      Je contacte un psychologue partenaire de{" "}
                      <strong>l’annuaire MonPsy</strong>.
                    </p>
                    <p>
                      Je peux choisir un psychologue qui réalise des séances à
                      distance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fr-col-10 fr-col-lg-2">
              <div className="fr-card fr-centered fr-card--no-arrow">
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
            <div className="fr-col-10 fr-col-lg-2">
              <div className="fr-card fr-centered fr-card--no-arrow">
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
            <div className="fr-col-10 fr-col-lg-2">
              <div className="fr-card fr-centered fr-card--no-arrow">
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
                <strong>A la fin de l’accompagnement: </strong>
              </p>
              <ul>
                <li>
                  Mon médecin et mon psychologue échangent entre eux pour faire
                  le point sur ma situation et m’orienter au mieux.
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
                  href="/faq/patients"
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
              <p>
                Je suis dans une des situations suivantes :
                <ul>
                  <li>
                    Bénéficiaire de la Complémentaire Santé Solidaire (CSS) ou
                    de
                  </li>
                  <li>
                    {" "}
                    l’Aide Médicale d’Etat (AME)&nbsp;? Soins en lien avec :
                    <ul>
                      <li>une affection de longue durée (ALD)&nbsp;?</li>
                      <li>
                        une maternité (à partir du 6ème mois de grossesse)?
                      </li>
                      <li>
                        un accident du travail-maladie professionnelle
                        (AT-MP)&nbsp;?
                      </li>
                      <li>une invalidité?</li>
                    </ul>
                  </li>
                </ul>
              </p>
              <p>
                Mon médecin précise sur le courrier d’adressage que je peux
                bénéficier du Tiers payant et que je ne fais pas l’avance des
                frais.
              </p>
              <p>
                J’apporte, lors de la première séance chez le psychologue, mon
                attestation de droits à jour et je donne au psychologue le
                courrier d’adressage de mon médecin.
              </p>
              <p>A la fin de chaque séance, je signe la feuille de soins.</p>
              <p>
                Le psychologue est rémunéré directement par mon organisme
                d’assurance maladie.
              </p>
              <p className="fr-mt-2w">
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
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-8">
              <p>
                <strong>
                  Le médecin doit demander l’accord des titulaires de l’autorité
                  parentale (des parents){" "}
                </strong>{" "}
                avant de m’orienter vers un accompagnement psychologique.
              </p>
              <p>
                Je peux identifier sur l’annuaire les psychologues partenaires
                qui souhaitent recevoir des enfants et des adolescents.
              </p>
              <p>Mes parents peuvent m’accompagner chez le psychologue.</p>
            </div>
            <div className="fr-col-4">
              <img
                src="/images/children.svg"
                alt="Je suis angoissé(e) ou déprimé(e) illustration"
              />
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-3">
              <img
                src="/images/Filsantejeunes.jpg"
                height="140"
                alt="Logo Fil santé jeunes"
              />
            </div>
            <div className="fr-col-9">
              <p>
                <strong>J’ai plus de 12 ans,</strong> je peux aller directement
                sur{" "}
                <a
                  href="https://www.filsantejeunes.com/ca-va-pas/mal-etre"
                  target="_blank"
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
                  href="/faq/patients"
                  className="fr-link fr-fi-question-line fr-link--icon-left"
                >
                  Je consulte la FAQ
                </a>
                <a
                  className="fr-link fr-fi-download-line fr-link--icon-left"
                  href="/documents/MonPsy_Flyer.pdf"
                >
                  Flyer d’information
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
