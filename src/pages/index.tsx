import Head from "next/head";
import React from "react";

const sendEmail = function (e) {
  // @ts-ignore
  process2(
    "https://services.sarbacane.com/core/v1/forms/contacts/upsert?listID&#x3D;gK9pKC6aT7ehlKKhbmLt9A&amp;formID&#x3D;hgLXy0uPQ0GSIAjQUj4hgQ&amp;timezone&#x3D;Europe/Paris",
    "https://forms.sbc08.com/",
    "5a5873edb85b530da84d23f7",
    "false",
    "message",
    "",
    "https://services.sarbacane.com/core/v1/transactional/sendmessage/optin",
    "Merci",
    "Votre email a bien été enregistré.",
    "Vous allez recevoir un email",
    "Vous devrez cliquer sur le lien de confirmation pour valider votre inscription",
    "Erreur",
    "Une erreur inattendue s%27est produite.",
    "Le formulaire est en cours d%27édition, veuillez patienter quelques minutes avant d%27essayer à nouveau.",
    "",
    "",
    ""
  );
  e.preventDefault();
  return false;
};

const Page = () => (
  <React.Fragment>
    <Head>
      <title>MonPsySanté</title>
      <meta property="og:title" content="MonPsySanté" />

      <meta
        name="description"
        content="MonPsySanté s’adresse à toute la population à partir de 3 ans présentant des troubles psychiques d’intensité légère à modérée. Dès le Printemps 2022, sur orientation d’un médecin, les patients (enfants, adolescents et adultes) pourront bénéficier de séances assurées par des psychologues volontaires conventionnés avec l’Assurance Maladie."
      />
      <meta
        property="og:description"
        content="MonPsySanté s’adresse à toute la population à partir de 3 ans présentant des troubles psychiques d’intensité légère à modérée. Dès le Printemps 2022, sur orientation d’un médecin, les patients (enfants, adolescents et adultes) pourront bénéficier de séances assurées par des psychologues volontaires conventionnés avec l’Assurance Maladie."
      />

      <meta property="og:type" content="website" />
      <script type="text/javascript" src="https://forms.sbc08.com/form.js" />
    </Head>
    <div className="fr-container">
      <div className="fr-grid-row fr-grid-row--center fr-centered fr-grid-row--middle fr-py-8w">
        <div className="fr-col-7 fr-pt-4w">
          <img
            className="hero"
            src="/images/Illustration.svg"
            width="600px"
            alt="En parler, c’est déjà se soigner"
          />
        </div>
        <div className="fr-col-5 fr-pt-4w">
          <h1 className="fr-mb-0">MonPsySanté</h1>
          <p className="fr-text--lg">En parler, c’est déjà se soigner.</p>
          <div className="fr-mt-4w">
            <strong>Nos objectifs</strong>
            <ul className="no-bullet">
              <li className="fr-mt-2w">
                <img
                  aria-hidden="true"
                  alt=""
                  className="fr-mr-1w"
                  height="32"
                  width="32"
                  src="/images/team-line.svg"
                />
                <strong className="highlight">
                  Améliorer&nbsp;la&nbsp;santé&nbsp;mentale
                </strong>{" "}
                de la population, enjeu majeur de la santé publique en France
              </li>
              <li className="fr-mt-2w">
                <img
                  aria-hidden="true"
                  alt=""
                  className="fr-mr-1w"
                  height="32"
                  width="32"
                  src="/images/money-euro-circle-line.svg"
                />
                Permettre aux patients en ayant besoin de bénéficier de{" "}
                <strong className="highlight">séances&nbsp;remboursées</strong>{" "}
                chez le psychologue
              </li>
              <li className="fr-mt-2w">
                <img
                  aria-hidden="true"
                  alt=""
                  className="fr-mr-1w"
                  height="32"
                  width="32"
                  src="/images/survey-line.svg"
                />
                Faciliter la candidature des psychologues au dispositif par une
                simplification des démarches
              </li>
              <li className="fr-mt-2w">
                <img
                  aria-hidden="true"
                  alt=""
                  className="fr-mr-1w"
                  height="32"
                  width="32"
                  src="/images/contacts-book-2-line.svg"
                />
                <strong className="highlight">
                  Trouver&nbsp;les&nbsp;psychologues&nbsp;partenaires
                </strong>{" "}
                proches de chez soi via la mise en ligne d’un annuaire national
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="fr-container--fluid ">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
          <div className="fr-col-12 fr-my-4w">
            <p className="fr-text--lg">
              <strong>MonPsySanté</strong> s’adresse à toute la population à
              partir de 3 ans présentant des troubles psychiques d’intensité
              légère à modérée. Dès le Printemps 2022, sur orientation d’un
              médecin, les patients (enfants, adolescents et adultes) pourront
              bénéficier de séances assurées par des psychologues volontaires
              conventionnés avec l’Assurance Maladie.
            </p>
          </div>
        </div>

        <div className="fr-grid-row fr-grid-row--center fr-grid-row--gutters fr-py-4w">
          <div className="fr-col-12 text-center">
            <a
              target="_blank"
              className="fr-btn fr-btn--secondary fr-mt-2w fr-mr-2w"
              href="/documents/MonPsySante_Flyer.pdf"
            >
              En savoir plus
            </a>
          </div>
        </div>
      </div>

      <div className="fr-container--fluid fr-bg--light text-center">
        <div className="fr-container fr-centered">
          <div className="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
            <div className="fr-col-8 fr-my-4w">
              <p className="fr-text--lg fr-mb-4v">
                Dès le printemps 2022, ce nouveau dispositif permettra aux
                patients en ayant besoin de bénéficier d’un remboursement de
                séances d’accompagnement réalisées par un psychologue volontaire
                et conventionné avec l’assurance maladie.
              </p>
              <p className="fr-mt-4w">
                Vous êtes psychologue et vous souhaitez en savoir plus pour
                candidater, laissez-nous votre email&nbsp;!
              </p>
              <form id="sb_form" onSubmit={sendEmail} method="post">
                <div id="form-header-title" />

                <span>
                  <label htmlFor="input-email" id="label-EMAIL_ID">
                    Votre email
                  </label>
                </span>
                <input
                  id="input-email"
                  type="email"
                  name="email"
                  required
                  className="fr-input"
                  sb-form-input="true"
                />
                <div id="div-submitInput" className="fr-mt-2w">
                  <button
                    id="submitInput"
                    type="submit"
                    value="Valider"
                    className="fr-btn"
                  >
                    Valider
                  </button>
                  <div className="loader d-none" />
                </div>
              </form>

              <p className="fr-text--lg--sm fr-mt-4w">
                Pour savoir ce qu’on fait de votre e-mail, vous pouvez voir
                notre{" "}
                <a href="/donnees-personnelles-et-gestion-des-cookies#mention-donnees-perso">
                  politique de confidentialité.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);
export default Page;
