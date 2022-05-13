import { Alert, Button } from "@dataesr/react-dsfr";
import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  allContactReasons,
  CONTACT_USER_TYPE,
} from "../../types/enums/contact";
import { DEPARTMENTS } from "../../types/enums/department";

const ContactForm = ({ userType }: { userType: string }) => {
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    text: string;
    type: "error" | "success" | "info";
  }>();
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
      <div className="fr-input-group" data-test-id="last-name-input">
        <label className="fr-label" aria-describedby="">
          Nom<span className="error"> *</span>
          <input
            className="fr-input"
            onChange={(e) => setLastName(e.target.value)}
            required
            value={lastName}
          />
        </label>
      </div>
      <div className="fr-input-group" data-test-id="first-name-input">
        <label className="fr-label" aria-describedby="">
          Prénom<span className="error"> *</span>
          <input
            className="fr-input"
            onChange={(e) => setFirstName(e.target.value)}
            required
            value={firstName}
          />
        </label>
      </div>
      <div className="fr-input-group" data-test-id="email-input">
        <label className="fr-label" aria-describedby="">
          Email<span className="error"> *</span>
          <input
            type="email"
            className="fr-input"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
          />
        </label>
      </div>
      <div className="fr-select-group">
        <label className="fr-label" aria-describedby="">
          Département<span className="error"> *</span>
          <select
            required
            className="fr-select"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
            }}
          >
            <option disabled value="" hidden>
              - Selectionner votre département -
            </option>

            {DEPARTMENTS.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
        </label>
      </div>
      {needReason(userType) && (
        <div className="fr-select-group" data-test-id="reason-select">
          <label className="fr-label">
            Motif<span className="error"> *</span>
            <select
              required
              className="fr-select"
              onChange={(e) => setReason(e.target.value)}
            >
              <option disabled value="" hidden>
                - Selectionner la raison de votre message -
              </option>
              {allContactReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      <div className="fr-input-group" data-test-id="message-input">
        <label className="fr-label">
          Message<span className="error"> *</span>
          <p className="fr-hint-text">
            Merci de ne fournir que les données personnelles strictement
            nécessaires au traitement de la demande.{" "}
          </p>
          <textarea
            className="fr-input"
            required
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
      </div>
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
          type={result.type}
          title={result.text}
        />
      )}
    </form>
  );
};

export default ContactForm;
