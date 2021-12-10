import Head from "next/head";
import React from "react";

const sendEmail = function () {
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
  return false;
};

const Page = () => (
  <React.Fragment>
    <Head>
      <title>Mon Psy Santé</title>
    </Head>
    <div className="fr-container">
      <div className="fr-grid-row fr-grid-row--center fr-centered fr-grid-row--middle fr-pb-4w">
        <div className="fr-col-12 fr-pt-4w">
          <h1>Mon Psy Santé</h1>
          <p> En parler, c’est déjà se soigner.</p>
        </div>
      </div>
      <div className="fr-container--fluid">
        <div className="fr-container fr-centered">
          <div className="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
            <div className="fr-col-8 fr-my-4w fr-highlight">
              <p className="fr-text">
                La santé mentale constitue l’un des enjeux majeurs de santé
                publique.
              </p>
              <p className="fr-text">
                <strong>Mon Psy Santé</strong> s’adresse à toute la population à
                partir de 3 ans présentant des troubles psychiques d’intensité
                légère à modérée. A partir d’avril 2022, sur orientation d’un
                médecin, les patients (enfants, adolescents et adultes) pourront
                bénéficier de séances assurées par des psychologues volontaires
                conventionnés avec l’Assurance Maladie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="fr-container--fluid">
      <div className="fr-container fr-centered">
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--gutters fr-py-4w">
          <div className="fr-col-12 fr-col-md-4 fr-m-2w fr-m-md-4w card white">
            <div className="fr-card fr-enlarge-link">
              <div className="fr-card__body">
                <h4 className="fr-card__title">
                  Un accès pour tous à des séances chez le psychologue
                </h4>
              </div>
            </div>
          </div>
          <div className="fr-col-12 fr-col-md-2 fr-m-2w fr-m-md-4w" />
          <div className="fr-col-12 fr-col-md-4 fr-m-2w fr-m-md-4w card white">
            <div className="fr-card fr-enlarge-link">
              <div className="fr-card__body">
                <h4 className="fr-card__title">
                  Un annuaire de psychologues volontaires et sélectionnés pour
                  répondre au mieux au besoin de la population
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="fr-container--fluid fr-bg--light">
      <div className="fr-container fr-centered">
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
          <div className="fr-col-8 fr-my-4w">
            <p className="fr-text fr-mb-4v">
              A partir de début 2022, un nouveau dispositif proposera des
              séances d’accompagnement psychologique auprès d’enfants comme
              d’adultes réalisé par un psychologue volontaire conventionné avec
              l’assurance maladie.
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
                sb-form-input
              />
              <div id="div-submitInput" className="fr-mt-2w">
                <button
                  id="submitInput"
                  type="submit"
                  value="Valider"
                  className="fr-btn fr-btn--alt fr-h5"
                >
                  Valider
                </button>
                <div className="loader d-none" />
              </div>
            </form>

            <p className="fr-text--sm fr-mt-4w">
              Pour savoir ce qu’on fait de votre e-mail, vous pouvez voir notre{" "}
              <a href="/donnees-personnelles-et-gestion-des-cookies#mention-donnees-perso">
                politique de confidentialité.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default Page;
