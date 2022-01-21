/* eslint-disable jest/no-conditional-expect */
import axios from "axios";

import { CONTACT_REASON, CONTACT_USER_TYPE } from "../../types/enums/contact";

describe("/api/contact", () => {
  it("should return a 200 when everything is filled for a Psychologist", async () => {
    const result = await axios.post("http://localhost:3000/api/contact", {
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

  it("should return a 200 when everything is filled for a Doctor", async () => {
    const result = await axios.post("http://localhost:3000/api/contact", {
      department: "06 - Alpes-Maritimes",
      email: "jane.dane@msp.fr",
      firstName: "Jane",
      lastName: "Dane",
      message: "Hello you !",
      userType: CONTACT_USER_TYPE.DOCTOR,
    });

    expect(result.status).toEqual(200);
  });

  const errors = [
    { label: "without department", values: { department: "95" } },
  ];
  errors.map((error) =>
    it(`Should return a 400 for a contact ${error.label}`, async () => {
      expect.assertions(1);
      try {
        await axios.post("http://localhost:3000/api/contact", {
          department: "06 - Alpes-Maritimes",
          email: "jane.dane@msp.fr",
          firstName: "Jane",
          lastName: "Dane",
          message: "Hello you !",
          reason: CONTACT_REASON.ELIGIBILITY,
          userType: CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED,
          ...error.values,
        });
      } catch (e) {
        expect(e.response.status).toEqual(400);
      }
    })
  );
});
