import sinon, { stub } from "sinon";

import * as contact from "../../services/contact";
import { CONTACT_REASON, CONTACT_USER_TYPE } from "../../types/enums/contact";
import controller from "./contact";

describe("Contact controller", () => {
  let sendMailStub;
  let resStub;

  beforeEach(() => {
    sendMailStub = stub(contact, "sendMail");
    resStub = {
      send: stub().returnsThis(),
      status: stub().returnsThis(),
    };
  });

  afterEach(() => {
    sendMailStub.restore();
  });

  it("should send a mail to configured address", async () => {
    await controller(
      // @ts-ignore: Partial object
      {
        body: {
          department: "06 - Alpes-Maritimes",
          email: "jane.dane@msp.fr",
          firstName: "Jane",
          lastName: "Dane",
          message: "Hello you !",
          reason: CONTACT_REASON.ELIGIBILITY,
          userType: CONTACT_USER_TYPE.PSYCHOLOGIST_PARTNER,
        },
        method: "POST",
      },
      resStub
    );

    sinon.assert.calledWith(
      sendMailStub,
      process.env.SUPPORT_MAIL,
      "Psychologue partenaire - Question relative à mon éligibilité",
      "Hello you !<br/><br/>Jane Dane -- 06 - Alpes-Maritimes<br/>jane.dane@msp.fr"
    );
  });
});
