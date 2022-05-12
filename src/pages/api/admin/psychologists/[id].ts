import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { handleApiError } from "../../../../services/api";
import { getOne, update } from "../../../../services/psychologists";

const updateSchema = Joi.object({
  address: Joi.string().required(),
  addressAdditional: Joi.string().allow("").allow(null),
  secondAddress: Joi.string().allow(""),
  secondAddressAdditional: Joi.string().allow("").allow(null),
  cdsmsp: Joi.string().allow(""),
  displayEmail: Joi.boolean().required(),
  email: Joi.string().email(),
  firstName: Joi.string().required(),
  languages: Joi.string().allow(null),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  displayPhone: Joi.boolean().required(),
  public: Joi.string()
    .valid("Adultes", "Adultes et enfants/adolescents", "Enfants/adolescents")
    .required(),
  teleconsultation: Joi.boolean().required(),
  visible: Joi.boolean().required(),
  website: Joi.string().allow("").allow(null),
});

export const updatePsy = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    const id = req.query.id as string;
    const existingPsychologist = await getOne(
      id,
      session.user.isSuperAdmin ? "" : (session.user.department as string)
    );
    if (!existingPsychologist) {
      return res.status(404).send("Psychologue non trouvé");
    }

    await updateSchema.validateAsync(req.body);

    await update(id, req.body);
    return res.status(200).send("Psychologue mis à jour");
  }
};

export default handleApiError(updatePsy);
