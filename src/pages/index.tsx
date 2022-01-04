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
      <div className="fr-grid-row fr-grid-row--center fr-centered fr-grid-row--middle fr-py-8w">
        <div className="fr-col-12 fr-col-md-7 fr-px-4w">
          <img
            className="hero"
            src="/images/Illustration.svg"
            width="100%"
            alt="En parler, c’est déjà se soigner"
          />
        </div>
        <div className="fr-col-12 fr-col-md-5">
          <h1 className="fr-mb-0">MonPsySanté</h1>
          <p className="fr-text--lg">
            Un dispositif en place à partir du printemps 2022
          </p>
          <div className="fr-mt-4w">
            <h2>Quels objectifs ?</h2>
            <ul className="no-bullet fr-p-0">
              <li className="fr-mt-2w fr-grid-row">
                <img
                  aria-hidden="true"
                  alt=""
                  className="fr-mr-1w fr-col-1 fr-my-auto"
                  height="32"
                  width="32"
                  src="/images/team-line.svg"
                />
                <p className="fr-col fr-m-0">
                  <strong className="highlight">
                    Améliorer&nbsp;la&nbsp;santé&nbsp;mentale
                  </strong>{" "}
                  de la population, enjeu majeur de la santé publique en France
                </p>
              </li>
              <li className="fr-mt-2w fr-grid-row">
                <img
                  aria-hidden="true"
                  alt=""
                  className="fr-mr-1w fr-col-1 fr-my-auto"
                  height="32"
                  width="32"
                  src="/images/money-euro-circle-line.svg"
                />
                <p className="fr-col fr-m-0">
                  Faire bénéficier les patients en ayant besoin de{" "}
                  <strong className="highlight">
                    séances&nbsp;remboursées
                  </strong>{" "}
                  chez le psychologue
                </p>
              </li>
              <li className="fr-mt-2w fr-grid-row">
                <img
                  aria-hidden="true"
                  alt=""
                  className="fr-mr-1w fr-col-1 fr-my-auto"
                  height="32"
                  width="32"
                  src="/images/contacts-book-2-line.svg"
                />
                <p className="fr-col fr-m-0">
                  Mettre à disposition un{" "}
                  <strong className="highlight">
                    annuaire de psychologues partenaires{" "}
                  </strong>
                  répartis sur tout le territoire national
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="fr-container--fluid ">
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
                  <p>Annonce du remboursement des séances de psychologues </p>
                </div>
              </li>
              <li>
                <div className="time-line-list-dot">
                  <p className="highlight">DÉBUT 2022</p>
                </div>
                <div className="time-line-list-border">
                  <p>
                    Les{" "}
                    <strong className="highlight">
                      psychologues volontaires
                    </strong>{" "}
                    peuvent candidater au dispositif via une procédure
                    dématérialisée
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
                    Les <strong className="highlight">patients</strong> peuvent
                    consulter l’annuaire des psychologues. Les parcours de prise
                    en charge peuvent débuter
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
                ligne (fin janvier 2022).{" "}
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

          <div className="fr-grid-row  fr-grid-row--gutters">
            <div className="fr-col-8 fr-by-4w">
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

              <p className="fr-text--lg--sm fr-mt-4w">
                Pour plus d’informations sur l’utilisation de votre e-mail, vous
                pouvez consulter notre{" "}
                <a href="/donnees-personnelles-et-gestion-des-cookies#mention-donnees-perso">
                  politique&nbsp;de&nbsp;confidentialité.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
export default Page;
