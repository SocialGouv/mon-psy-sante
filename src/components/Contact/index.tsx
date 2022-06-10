import React, { useState } from "react";

import {
  allContactUserTypes,
  CONTACT_USER_TYPE,
} from "../../types/enums/contact";
import ContactForm from "./Form";
import Psychologist from "./Psychologist";
import Public from "./Public";

const Contact = () => {
  const [userType, setUserType] = useState("");

  return (
    <div className="fr-grid-row fr-grid-row--center fr-my-4w">
      <div className="fr-col-lg-8">
        <h1>Nous contacter</h1>
        <p className="fr-text--lg">
          Pour toute question, nous vous invitons à consulter préalablement la
          Foire aux Questions (FAQ).
        </p>
        <div className="fr-select-group">
          <label className="fr-label" htmlFor="select">
            Je suis
            <span className="error"> *</span>
          </label>
          <select
            data-test-id="user-type-select"
            className="fr-select"
            required
            id="select"
            name="select"
            value={userType}
            onChange={(e) => {
              setUserType(e.target.value);
            }}
          >
            <option value="" disabled hidden>
              - Veuillez indiquer votre profil -
            </option>
            {allContactUserTypes.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {(userType === CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED ||
          userType === CONTACT_USER_TYPE.OTHER) && (
          <ContactForm userType={userType} />
        )}
        {(userType === CONTACT_USER_TYPE.DOCTOR ||
          userType === CONTACT_USER_TYPE.PSYCHOLOGIST_PARTNER) && (
          <Psychologist />
        )}
        {userType === CONTACT_USER_TYPE.PUBLIC && <Public />}
      </div>
    </div>
  );
};

export default Contact;
