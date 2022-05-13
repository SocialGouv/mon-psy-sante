import {
  Alert,
  Button,
  SearchableSelect,
  Select,
  TextInput,
} from "@dataesr/react-dsfr";
import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  allContactReasons,
  CONTACT_USER_TYPE,
} from "../../types/enums/contact";
import { DEPARTMENTS } from "../../types/enums/department";

const ContactForm = ({ userType }: { userType: string }) => {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ text: string; type: string }>();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [reason, setReason] = useState<string>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setReason(needReason(userType) ? "" : undefined);
  }, [userType]);

  const submit = (e) => {
    e.preventDefault();
    setResult(null);
    setSending(true);
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
        setResult({
          text: "Votre message a bien été transmis à nos équipes, nous vous répondrons dans les plus brefs délais.",
          type: "success",
        });
      })
      .catch((e) =>
        setResult({
          text: e.response.data,
          type: "error",
        })
      )
      .finally(() => {
        setSending(false);
      });
  };

  const needReason = (type: string) =>
    type === CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED;

  return (
    <form onSubmit={submit}>
      <TextInput
        data-test-id="last-name-input"
        required
        label="Nom"
        //@ts-ignore
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextInput
        data-test-id="first-name-input"
        required
        label="Prenom"
        //@ts-ignore
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextInput
        data-test-id="email-input"
        required
        //@ts-ignore
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
          //@ts-ignore
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
        //@ts-ignore
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button submit data-test-id="submit-button" disabled={sending}>
        {sending ? (
          <>
            <span className="fr-fi-refresh-line" aria-hidden="true" /> Envoi en
            cours...
          </>
        ) : (
          "Envoyer un message"
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
  );
};

export default ContactForm;
