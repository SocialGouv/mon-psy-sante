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
    label: "Visible dans l'annuaire",
    type: "boolean",
  },
  { field: "lastName", label: "Nom", required: true },
  { field: "firstName", label: "Prénom", required: true },
  { field: "address", label: "Adresse", required: true },
  { field: "phone", label: "Téléphone", required: true },
  { field: "email", label: "Email" },
  {
    field: "displayEmail",
    label: "Rendre visible l'email",
    type: "boolean",
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
  { field: "languages", label: "Langue(s) parlée(s)" },
  { field: "cdsmsp", label: "Nom du CDS ou de la MSP" },
  { field: "website", label: "Site" },
  {
    field: "teleconsultation",
    label: "Possibilité de séances à distance",
    type: "boolean",
  },
];

const PsychologistForm = ({ psychologist }: { psychologist: Psychologist }) => {
  const [result, setResult] = useState<{ type: string; text: string }>();
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

  const submit = (e) => {
    e.preventDefault();
    setResult(null);
    axios
      .put(`/api/psychologists/${modifiedPsychologist.id}`, {
        address: modifiedPsychologist.address,
        cdsmsp: modifiedPsychologist.cdsmsp,
        displayEmail: modifiedPsychologist.displayEmail,
        email: modifiedPsychologist.email,
        firstName: modifiedPsychologist.firstName,
        languages: modifiedPsychologist.languages,
        lastName: modifiedPsychologist.lastName,
        phone: modifiedPsychologist.phone,
        public: modifiedPsychologist.public,
        teleconsultation: modifiedPsychologist.teleconsultation,
        visible: modifiedPsychologist.visible,
        website: modifiedPsychologist.website,
      })
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
      });
  };

  return (
    <Row className="fr-my-4w" justifyContent="center">
      <Col className="fr-col-lg-8">
        <h1>Modifier le psychologue</h1>
        <form onSubmit={submit}>
          {editableFields.map((editableField) => {
            switch (editableField.type) {
              case "boolean":
                return (
                  <>
                    <label className="fr-label">{editableField.label}</label>
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
                  </>
                );
              case "select":
                return (
                  <Select
                    key={editableField.label}
                    required={editableField.required}
                    label={editableField.label}
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
                    value={modifiedPsychologist[editableField.field]}
                    onChange={(e) =>
                      update(editableField.field, e.target.value)
                    }
                  />
                );
            }
          })}
          <Button submit>Enregistrer</Button>
          {result && (
            <Alert
              data-test-id="alert"
              className="fr-mt-4w"
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
