import axios from "axios";

import config from "../../services/config";
import { CONTACT_REASON, CONTACT_USER_TYPE } from "../../types/enums/contact";

describe("/api/contact", () => {
  it("should return a 200 when everything is filled for a Psychologist", async () => {
    const result = await axios.post(`${config.nextAuth.url}/api/contact`, {
      department: "06 - Alpes-Maritimes",
      email: "jane.dane@msp.fr",
      firstName: "Jane",
      lastName: "Dane",
      message: "Hello you !",
      reason: CONTACT_REASON.ELIGIBILITY,
      userType: CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED,
    });

    expect(result.status).toEqual(200);
  });

  it("should return a 200 when everything is filled for an other person", async () => {
    const result = await axios.post(`${config.nextAuth.url}/api/contact`, {
      department: "06 - Alpes-Maritimes",
      email: "jane.dane@msp.fr",
      firstName: "Jane",
      lastName: "Dane",
      message: "Hello you !",
      userType: CONTACT_USER_TYPE.OTHER,
    });

    expect(result.status).toEqual(200);
  });

  const errors = [
    { label: "with wrong department", values: { department: "95" } },
    { label: "without department", values: { department: "" } },
    { label: "with wrong email", values: { email: "test" } },
    { label: "without email", values: { email: "" } },
    { label: "without lastName", values: { lastName: "" } },
    { label: "without firstName", values: { firstName: "" } },
    { label: "without message", values: { message: "" } },
    {
      label: "with wrong userType",
      values: { userType: CONTACT_USER_TYPE.DOCTOR },
    },
    { label: "without userType", values: { userType: "" } },
    {
      label: "with psychologist and without reason",
      values: {
        reason: "",
        userType: CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED,
      },
    },
    {
      label: "with psychologist and with wrong reason",
      values: {
        reason: "wrong reason",
        userType: CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED,
      },
    },
  ];
  errors.map((error) =>
    it(`Should return a 400 for a contact ${error.label}`, async () => {
      let result;

      const defaultValues = {
        department: "06 - Alpes-Maritimes",
        email: "jane.dane@msp.fr",
        firstName: "Jane",
        lastName: "Dane",
        message: "Hello you !",
        userType: CONTACT_USER_TYPE.OTHER,
      };

      const resutSuccess = await axios.post(
        `${config.nextAuth.url}/api/contact`,
        defaultValues
      );
      expect(resutSuccess.status).toEqual(200);

      await axios
        .post(`${config.nextAuth.url}/api/contact`, {
          ...defaultValues,
          ...error.values,
        })
        .catch((e) => {
          result = e;
        });
      expect(result.response.status).toEqual(400);
    })
  );
});
