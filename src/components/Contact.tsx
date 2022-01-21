import {
  Alert,
  Button,
  Col,
  Row,
  SearchableSelect,
  Select,
  TextInput,
} from "@dataesr/react-dsfr";
import axios from "axios";
import React, { useState } from "react";

import {
  allContactReasons,
  allContactUserTypes,
  CONTACT_USER_TYPE,
} from "../types/enums/contact";
import { DEPARTMENTS } from "../types/enums/department";

const Contact = () => {
  const [result, setResult] = useState<{ text: string; type: string }>();
  const [userType, setUserType] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [reason, setReason] = useState(null);
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setResult(null);
    axios
      .post("/api/contact", {
        department,
        email,
        firstName,
        lastName,
        message,
        reason: reason || undefined,
        userType,
      })
      .then(() => {
        window.scrollTo({ behavior: "smooth", top: 0 });
        setResult({
          text: "Message envoyé.",
          type: "success",
        });
      })
      .catch((e) =>
        setResult({
          text: e.response.data,
          type: "error",
        })
      );
  };

  const needReason = (type: string) =>
    type === CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED ||
    type === CONTACT_USER_TYPE.PSYCHOLOGIST_PARTNER;

  return (
    <Row className="fr-my-4w" justifyContent="center">
      <Col className="fr-col-lg-8">
        {result && (
          <Alert
            data-test-id="alert"
            className="fr-mb-2w"
            type={result.type}
            title={result.text}
          />
        )}
        <form onSubmit={submit}>
          <Select
            data-test-id="user-type-select"
            required
            label="Je suis"
            options={[
              {
                disabled: true,
                hidden: true,
                label: "- Veuillez indiquer votre profil -",
                value: "",
              },
              ...allContactUserTypes.map((item) => ({
                label: item,
                value: item,
              })),
            ]}
            selected={userType}
            onChange={(e) => {
              const value = e.target.value;
              setUserType(value);
              setReason(needReason(value) ? "" : null);
            }}
          />
          <TextInput
            data-test-id="last-name-input"
            required
            label="Nom"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextInput
            data-test-id="first-name-input"
            required
            label="Prenom"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            data-test-id="email-input"
            required
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <SearchableSelect
            data-test-id="department-select"
            required
            label="Département"
            options={[
              {
                disabled: true,
                hidden: true,
                label: "- Selectionner votre département -",
                value: "",
              },
              ...DEPARTMENTS.map((department) => ({
                label: department,
                value: department,
              })),
            ]}
            selected={department}
            onChange={setDepartment}
          />
          {needReason(userType) && (
            <Select
              data-test-id="reason-select"
              required
              label="Motif"
              options={[
                {
                  disabled: true,
                  hidden: true,
                  label: "- Selectionner la raison de votre message -",
                  value: "",
                },
                ...allContactReasons.map((reason) => ({
                  label: reason,
                  value: reason,
                })),
              ]}
              selected={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          )}
          <TextInput
            data-test-id="message-input"
            required
            textarea
            hint="Merci de ne fournir que les données personnelles strictement nécessaires au traitement de la demande. "
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button submit data-test-id="submit-button">
            Envoyer un message
          </Button>
        </form>
      </Col>
    </Row>
  );
};

export default Contact;
