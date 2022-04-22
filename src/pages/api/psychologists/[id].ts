import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { handleApiError } from "../../../services/api";
import { getOne, update } from "../../../services/psychologists";

const updateSchema = Joi.object({
  address: Joi.string().required(),
  secondAddress: Joi.string().allow(""),
  cdsmsp: Joi.string().allow(""),
  displayEmail: Joi.boolean().required(),
  email: Joi.string().email(),
  firstName: Joi.string().required(),
  languages: Joi.string().allow(null),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  public: Joi.string()
    .valid("Adultes", "Adultes et enfants/adolescents", "Enfants/adolescents")
    .required(),
  teleconsultation: Joi.boolean().required(),
  visible: Joi.boolean().required(),
  website: Joi.string().allow(null),
});

const psychologist = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).send("Opération impossible");
    }
    const id = req.query.id as string;
    const existingPsychologist = await getOne(id);

    if (
      !existingPsychologist ||
      existingPsychologist.instructorId !== session.user.group
    ) {
      return res.status(404).send("Psychologue non trouvé");
    }

    await updateSchema.validateAsync(req.body);

    await update(id, req.body);
    return res.status(200).send("Psychologue mis à jour");
  }
};

export default handleApiError(psychologist);
