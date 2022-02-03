import { Col, Row, Select } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import {
  allContactUserTypes,
  CONTACT_USER_TYPE,
} from "../../types/enums/contact";
import ContactForm from "./Form";
import Psychologist from "./Psychologist";
import Public from "./Public";

const Contact = () => {
  const router = useRouter();
  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NEW_FEATURES !== "true") {
      router.push("/");
    }
  }, []);

  return (
    <Row className="fr-my-4w" justifyContent="center">
      <Col className="fr-col-lg-8">
        <h1>Nous contacter</h1>
        <p className="fr-text--lg">
          Pour toute question, nous vous invitons à consulter préalablement la
          Foire aux Questions (FAQ).
        </p>
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
            setUserType(e.target.value);
          }}
        />
        {(userType === CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED ||
          userType === CONTACT_USER_TYPE.OTHER) && (
          <ContactForm userType={userType} />
        )}
        {(userType === CONTACT_USER_TYPE.DOCTOR ||
          userType === CONTACT_USER_TYPE.PSYCHOLOGIST_PARTNER) && (
          <Psychologist />
        )}
        {userType === CONTACT_USER_TYPE.PUBLIC && <Public />}
      </Col>
    </Row>
  );
};

export default Contact;