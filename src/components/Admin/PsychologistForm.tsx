import {
  Alert,
  Button,
  Col,
  Row,
  Select,
  TextInput,
} from "@dataesr/react-dsfr";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Psychologist } from "../../types/psychologist";

const editableFields = [
  {
    field: "visible",
    label: "Disponibilité du psychologue :",
    legend: "En indisponible les modalités de contact ne seront plus visible",
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
    legend: "Informations complémentaires (cabinet principal)",
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
    options: [
      "Adultes",
      "Adultes et enfants/adolescents",
      "Enfants/adolescents",
    ],
    required: true,
    type: "select",
  },
  {
    field: "languages",
    label: "Langues de réalisation des séances (autre que le français)",
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
  const [result, setResult] = useState<{ type: string; text: string }>();
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
          text: "Psychologue correctement mis à a jour",
          type: "success",
        });
      })
      .catch(() => {
        setResult({
          text: "Une erreur est survenue, veuillez reesayer",
          type: "error",
        });
      })
      .finally(() => {
        setSending(false);
      });
  };

  return (
    <Row className="fr-my-4w" justifyContent="center">
      <Col className="fr-col-lg-8">
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
                  <Select
                    key={editableField.label}
                    //@ts-ignore
                    required={editableField.required}
                    label={editableField.label}
                    hint={editableField.legend}
                    options={editableField.options.map((option) => ({
                      label: option,
                      value: option,
                    }))}
                    selected={modifiedPsychologist[editableField.field]}
                    onChange={(e) =>
                      update(editableField.field, e.target.value)
                    }
                  />
                );
              default:
                return (
                  <TextInput
                    key={editableField.label}
                    required={editableField.required}
                    label={editableField.label}
                    hint={editableField.legend}
                    //@ts-ignore
                    value={modifiedPsychologist[editableField.field]}
                    onChange={(e) =>
                      update(editableField.field, e.target.value)
                    }
                  />
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
          <Button submit disabled={sending}>
            {sending ? (
              <>
                <span className="fr-fi-refresh-line" aria-hidden="true" />{" "}
                Sauvegarde en cours ...
              </>
            ) : (
              "Enregistrer"
            )}
          </Button>
          {result && (
            <Alert
              data-test-id="alert"
              className="fr-mt-4w"
              //@ts-ignore
              type={result.type}
              title={result.text}
            />
          )}
        </form>
      </Col>
    </Row>
  );
};
export default PsychologistForm;
