import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";

import { handleApiError } from "../../services/api";
import { sendMail } from "../../services/contact";
import {
  allContactReasons,
  allContactUserTypes,
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
        is: Joi.string().valid(
          CONTACT_USER_TYPE.PSYCHOLOGIST_INTERESTED,
          CONTACT_USER_TYPE.PSYCHOLOGIST_PARTNER
        ),
        then: Joi.string()
          .valid(...allContactReasons)
          .required(),
      },
    ]),
  userType: Joi.string()
    .valid(...allContactUserTypes)
    .required(),
});

const contact = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await contactSchema.validateAsync(req.body);

    await sendMail("xavier.desoindre@hotmail.fr", "Hello", req.body.message);

    return res.status(200).send("Success");
  }
};

export default handleApiError(contact);
