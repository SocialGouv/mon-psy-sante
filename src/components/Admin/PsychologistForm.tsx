import axios from "axios";
import React, { useEffect, useState } from "react";

import { PUBLIC } from "../../types/enums/public";
import { Psychologist } from "../../types/psychologist";

const editableFields = [
  {
    field: "visible",
    label: "Disponibilité du psychologue :",
    legend: "En indisponible les modalités de contact ne seront plus visibles",
    type: "boolean",
    options: [
      { label: "Disponible", value: true },
      { label: "Indisponible", value: false },
    ],
    required: true,
  },
  { field: "lastName", label: "Nom", required: true },
  { field: "firstName", label: "Prénom", required: true },
  {
    field: "address",
    label: "Adresse postale du cabinet principal",
    legend:
      "Préciser ici : numéro, libellé de la voie, code postal, et ville. Cette adresse doit se situer dans le même département que la CPAM. Pour les séances au domicile du patient, noter le code postal + ville.",
    required: true,
  },
  {
    field: "addressAdditional",
    label: "Informations complémentaires (cabinet principal)",
    legend:
      "Exemple : nom d'un bâtiment, d'une résidence, digicode, etc. Si le psychologue propose uniquement des séances au domicile du patient, noter ici \"Séances à domicile\".",
  },
  {
    field: "secondAddress",
    label: "Adresse postale d'un second lieu d'exercice",
    legend:
      "Bien préciser : numéro et libellé de la voie, code postal, et ville",
  },
  {
    field: "secondAddressAdditional",
    label: "Informations complémentaires (second lieu)",
  },
  { field: "phone", label: "Téléphone", required: true },
  // Todo: add type email to input when it's supported by @dataesr/react-dsfr.
  { field: "email", label: "Email" },
  {
    field: "displayEmail",
    label: "Afficher l'email :",
    type: "boolean",
    options: [
      { label: "Oui", value: true },
      { label: "Non", value: false },
    ],
  },
  {
    field: "website",
    label: "Site web",
    legend:
      "Préciser ici l'url complet du site internet en commençant par http:// ou https://",
  },
  {
    field: "public",
    label: "Public",
    options: Object.values(PUBLIC),
    required: true,
    type: "select",
  },
  {
    field: "languages",
    label: "Langues de réalisation des séances (autre que le français)",
    legend: "Lister les langues en les séparant par une virgule",
  },
  {
    field: "cdsmsp",
    label: "Nom du CDS ou de la MSP",
    legend:
      "A préciser UNIQUEMENT si le psychologue a une activité salariée en MSP ou CDS et s’il a choisi d’être conventionné au titre de cette activité salariée.",
  },
  {
    field: "teleconsultation",
    label: "Possibilité de séances à distance :",
    type: "boolean",
    options: [
      { label: "Oui", value: true },
      { label: "Non", value: false },
    ],
  },
];

const PsychologistForm = ({
  psychologist,
  isSuperAdmin,
}: {
  psychologist: Psychologist;
  isSuperAdmin: boolean;
}) => {
  const [result, setResult] = useState<{
    type: "success" | "error";
    text: string;
    title: string;
  }>();
  const [sending, setSending] = useState(false);

  const [modifiedPsychologist, setModifiedPsychologist] =
    useState(psychologist);
  useEffect(() => {
    setModifiedPsychologist(psychologist);
  }, [psychologist]);

  const update = (field: string, value: any) => {
    setModifiedPsychologist({
      ...modifiedPsychologist,
      [field]: value,
    });
  };

  const findLabel = (options: any[], value: boolean): string => {
    const selected = options.find((item) => item.value === value);
    return selected.label;
  };

  const submit = (e) => {
    e.preventDefault();
    setResult(null);
    setSending(true);
    axios
      .put(
        `/api/admin/psychologists/${modifiedPsychologist.id}`,
        modifiedPsychologist
      )
      .then(() => {
        setResult({
          title: "Psychologue correctement mis à jour",
          type: "success",
          text: "",
        });
      })
      .catch((e) => {
        setResult({
          title: "Une erreur est survenue, veuillez réessayer",
          type: "error",
          text: e.response?.data || "",
        });
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <div className="fr-grid-row fr-grid-row--center fr-my-4w">
      <div className="fr-col-lg-8">
        <h1>Modifier le psychologue</h1>
        <p className="fr-hint-text">
          Les champs suivis d’un astérisque ( <span className="error"> *</span>{" "}
          ) sont obligatoires.
        </p>
        <form onSubmit={submit} className="fr-mt-3w">
          {editableFields.map((editableField) => {
            switch (editableField.type) {
              case "boolean":
                return (
                  <div className="fr-fieldset fr-mb-1w">
                    <label className="fr-label">
                      {editableField.label}{" "}
                      <strong>
                        {findLabel(
                          editableField.options,
                          modifiedPsychologist[editableField.field]
                        )}
                      </strong>
                    </label>
                    {editableField.legend && (
                      <p className="fr-hint-text fr-mb-0">
                        {editableField.legend}
                      </p>
                    )}
                    <div key={editableField.label} className="fr-toggle">
                      <input
                        id={editableField.label}
                        type="checkbox"
                        className="fr-toggle__input"
                        checked={modifiedPsychologist[editableField.field]}
                        onChange={(e) => {
                          update(editableField.field, e.target.checked);
                        }}
                      />
                      <label
                        className="fr-toggle__label"
                        htmlFor={editableField.label}
                      />
                    </div>
                  </div>
                );
              case "select":
                return (
                  <div className="fr-select-group" key={editableField.label}>
                    <label className="fr-label" htmlFor="select">
                      {editableField.label}
                      {editableField.required && (
                        <span className="error"> *</span>
                      )}
                    </label>
                    <select
                      className="fr-select"
                      required={editableField.required}
                      id="select"
                      name="select"
                      value={modifiedPsychologist[editableField.field]}
                      onChange={(e) => {
                        update(editableField.field, e.target.value);
                      }}
                    >
                      <option value="" disabled hidden>
                        Selectionnez une option
                      </option>
                      {editableField.options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              default:
                return (
                  <div className="fr-input-group" key={editableField.label}>
                    <label className="fr-label" htmlFor="text-input-text">
                      {editableField.label}
                      {editableField.required && (
                        <span className="error"> *</span>
                      )}
                      {editableField.legend && (
                        <span className="fr-hint-text">
                          {editableField.legend}
                        </span>
                      )}
                    </label>
                    <input
                      className="fr-input"
                      required={editableField.required}
                      type={editableField.type || "text"}
                      id="text-input-text"
                      name="text-input-text"
                      value={modifiedPsychologist[editableField.field]}
                      onChange={(e) =>
                        update(editableField.field, e.target.value)
                      }
                    />
                  </div>
                );
            }
          })}
          {isSuperAdmin && (
            <div className="fr-fieldset fr-mb-1w">
              <label className="fr-label">
                Afficher le téléphone :{" "}
                <strong>
                  {findLabel(
                    [
                      { label: "Oui", value: true },
                      { label: "Non", value: false },
                    ],
                    modifiedPsychologist["displayPhone"]
                  )}
                </strong>
              </label>
              <div className="fr-toggle">
                <input
                  id="displayPhone"
                  type="checkbox"
                  className="fr-toggle__input"
                  checked={modifiedPsychologist["displayPhone"]}
                  onChange={(e) => {
                    update("displayPhone", e.target.checked);
                  }}
                />
                <label className="fr-toggle__label" htmlFor={"displayPhone"} />
              </div>
            </div>
          )}
          <button className="fr-btn" disabled={sending} type="submit">
            {sending ? (
              <>
                <span className="fr-fi-refresh-line" aria-hidden="true" />{" "}
                Sauvegarde en cours ...
              </>
            ) : (
              "Enregistrer"
            )}
          </button>
          {result && result.type === "success" && (
            <div className="fr-alert fr-alert--success fr-mt-4w">
              <p className="fr-alert__title">{result.title}</p>
              <p>{result.text}</p>
            </div>
          )}
          {result && result.type === "error" && (
            <div className="fr-alert fr-alert--error fr-mt-4w">
              <p className="fr-alert__title">{result.title}</p>
              <p>{result.text}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default PsychologistForm;
