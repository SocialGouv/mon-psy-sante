import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

import { handleApiError } from "../../services/api";
import config from "../../services/config";
import { sendMail } from "../../services/contact";
import {
  allContactReasons,
  CONTACT_USER_TYPE,
} from "../../types/enums/contact";
import { DEPARTMENTS } from "../../types/enums/department";

const contactSchema = Joi.object({
  department: Joi.string()
    .valid(...DEPARTMENTS)
    .required(),
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  message: Joi.string().required(),
  reason: Joi.string()
    .optional()
    .when("userType", [
      {
        is: CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED,
        then: Joi.string()
          .valid(...allContactReasons)
          .required(),
      },
    ]),
  userType: Joi.string()
    .valid(CONTACT_USER_TYPE.OTHER, CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED)
    .required(),
});

const contact = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await contactSchema.validateAsync(req.body);

    const subject =
      req.body.userType === CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED
        ? `Psychologue - ${req.body.reason}`
        : "Question d'un autre utilisateur";

    await sendMail(
      config.supportMail,
      subject,
      `${req.body.message}<br/><br/>${req.body.firstName} ${req.body.lastName} -- ${req.body.department}<br/>${req.body.email}`
    );

    return res.status(200).send("Success");
  }
};

export default handleApiError(contact);
