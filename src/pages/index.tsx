import { Button, TextInput } from "@dataesr/react-dsfr";
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
  <>
    <div className="fr-container">
      <div className="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-pb-8w">
        <div className="fr-col-12 fr-pt-8w">
          <h1>En parler, c’est déjà se soigner</h1>
          <p>
            Faites bénéficier votre enfant d’un accompagnement psychologique
            gratuit
          </p>
        </div>
        <div className="fr-col-12 fr-col-md-3 fr-pt-6w fr-centered">
          <a className="fr-btn fr-text--lg" href="/psychologues">
            Je suis psychologue
          </a>
          <a className="fr-btn fr-mt-8w fr-text--lg" href="/medecins">
            Je suis médecin
          </a>
        </div>
        <div className="fr-col-12 fr-col-md-6 fr-centered">
          <img
            className="hero"
            src="/images/Illustration.svg"
            alt="En parler, c’est déjà se soigner"
          />
        </div>
        <div className="fr-col-12 fr-col-md-3 fr-pt-6w fr-centered">
          <a className="fr-btn fr-text--lg" href="/patients">
            Je suis patient
          </a>
          <a className="fr-btn fr-mt-8w fr-text--lg" href="/parents">
            Je suis parent
          </a>
        </div>
        <div className="fr-col-0 fr-col-md-1 fr-mt-4w"></div>
      </div>
    </div>
    <div className="fr-container--fluid">
      <div className="fr-container">
        <div className="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
          <div className="fr-col-12">
            <h2>À qui ça s’adresse ?</h2>

            <p className="fr-text--lg">
              <strong>MonPsySanté</strong> s’adresse à toute la population à
              partir de 3 ans présentant des troubles psychiques d’intensité
              légère à modérée.
            </p>
          </div>
        </div>

        <div className="fr-grid-row fr-grid-row--center fr-py-4w">
          <div className="fr-col-12">
            <h2>À partir de quand ?</h2>
            <p className="fr-text--lg">
              <strong>Dès le printemps 2022</strong>, sur orientation d’un
              médecin, les patients (enfants, adolescents et adultes) pourront
              bénéficier de séances assurées par des psychologues volontaires
              conventionnés avec l’Assurance Maladie.{" "}
              <a target="_blank" href="/documents/MonPsySante_Flyer.pdf">
                En savoir plus
              </a>
            </p>
            <ul className="time-line-list no-bullet">
              <li className="before">
                <div className="time-line-list-dot">
                  <p className="highlight">SEPTEMBRE 2021</p>
                </div>
                <div className="time-line-list-border before">
                  <p>Annonce du remboursement des séances de psychologues</p>
                </div>
              </li>
              <li>
                <div className="time-line-list-dot">
                  <p className="highlight">DÉBUT 2022</p>
                </div>
                <div className="time-line-list-border">
                  <p>
                    Les <strong>psychologues volontaires</strong> peuvent
                    candidater au dispositif via une procédure dématérialisée
                  </p>
                </div>
              </li>
              <li>
                <div className="time-line-list-dot">
                  <strong className="highlight fr-text--lg fr-mb-2w">
                    PRINTEMPS 2022
                  </strong>
                </div>
                <div className="time-line-list-border">
                  <p>
                    Les <strong>patients</strong> peuvent consulter l’annuaire
                    des psychologues. Les parcours de prise en charge peuvent
                    débuter
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="fr-container--fluid fr-bg--light">
        <div className="fr-container">
          <div className="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
            <div className="fr-col-12 fr-mt-4w">
              <h2>
                Vous êtes psychologue
                <br />
                et vous souhaitez candidater&nbsp;?
              </h2>
              <p className="fr-mb-0">
                Le formulaire de candidature sera prochainement disponible en
                ligne (février 2022).{" "}
                <a
                  target="_blank"
                  href="/documents/MonPsySante_Flyer-candidatures-psychologues.pdf"
                >
                  En savoir plus
                </a>
              </p>
              <p>
                Laissez nous votre e-mail, et nous vous enverrons toutes les
                informations nécessaires, dès l’ouverture des candidatures.
              </p>
            </div>
          </div>

          <div className="fr-grid-row">
            <div className="fr-col-8 fr-mb-4w">
              <form id="sb_form" onSubmit={sendEmail} method="post">
                <div id="form-header-title" />
                <TextInput
                  label="Votre email :"
                  name="email"
                  placeholder="Votre email"
                  type="email"
                  required
                />
                <div id="div-submitInput">
                  <Button submit id="submitInput">
                    Valider
                  </Button>
                  <div className="loader d-none" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
export default Page;
