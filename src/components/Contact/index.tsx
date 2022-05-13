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
      <div className="fr-col fr-col-lg-8">
        <h1>Nous contacter</h1>
        <p className="fr-text--lg">
          Pour toute question, nous vous invitons à consulter préalablement la
          Foire aux Questions (FAQ).
        </p>
        <div className="fr-select-group" data-test-id="user-type-select">
          <label className="fr-label" aria-describedby="">
            Je suis<span className="error"> *</span>
            <select
              required
              className="fr-select"
              onChange={(e) => {
                setUserType(e.target.value);
              }}
            >
              <option disabled value="" hidden>
                - Veuillez indiquer votre profil -
              </option>

              {allContactUserTypes.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </label>
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
