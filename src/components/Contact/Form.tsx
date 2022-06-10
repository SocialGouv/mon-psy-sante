import { SearchableSelect } from "@dataesr/react-dsfr";
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
      <div className="fr-input-group">
        <label className="fr-label" htmlFor="last-name-input">
          Nom<span className="error"> *</span>
        </label>
        <input
          data-test-id="last-name-input"
          className="fr-input"
          required
          id="last-name-input"
          name="last-name-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="fr-input-group">
        <label className="fr-label" htmlFor="first-name-input">
          Prénom<span className="error"> *</span>
        </label>
        <input
          data-test-id="first-name-input"
          className="fr-input"
          required
          id="first-name-input"
          name="first-name-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="fr-input-group">
        <label className="fr-label" htmlFor="email-input">
          Email<span className="error"> *</span>
        </label>
        <input
          data-test-id="email-input"
          className="fr-input"
          required
          type="email"
          id="email-input"
          name="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
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
        <div className="fr-select-group">
          <label className="fr-label" htmlFor="select">
            Motif
            <span className="error"> *</span>
          </label>
          <select
            data-test-id="reason-select"
            className="fr-select"
            required
            id="select"
            name="select"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="" disabled hidden>
              - Selectionner la raison de votre message -
            </option>
            {allContactReasons.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="fr-input-group">
        <label className="fr-label" htmlFor="text-input-text">
          Message<span className="error"> *</span>
          <span className="fr-hint-text">
            Merci de ne fournir que les données personnelles strictement
            nécessaires au traitement de la demande.{" "}
          </span>
        </label>
        <textarea
          className="fr-input"
          required
          id="text-input-text"
          name="text-input-text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button
        className="fr-btn"
        type="submit"
        data-test-id="submit-button"
        disabled={sending}
      >
        {sending ? (
          <>
            <span className="fr-fi-refresh-line" aria-hidden="true" /> Envoi en
            cours...
          </>
        ) : (
          "Envoyer un message"
        )}
      </button>
      {result && (
        <div
          className={
            result.type === "success"
              ? "fr-alert fr-alert--success fr-mt-4w"
              : "fr-alert fr-alert--error fr-mt-4w"
          }
        >
          <p className="fr-alert__title">{result.text}</p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
