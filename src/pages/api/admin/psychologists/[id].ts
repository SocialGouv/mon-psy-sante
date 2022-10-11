import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { handleApiError } from "../../../../services/api";
import { formatPsychologist } from "../../../../services/format-psychologists";
import {
  filterAllowedKeys,
  getOne,
  update,
} from "../../../../services/psychologists";
import { PUBLIC } from "../../../../types/enums/public";

const updateSchema = Joi.object({
  address: Joi.string().required(),
  coordinates: Joi.object().allow(null),
  addressAdditional: Joi.string().allow("", null),
  secondAddress: Joi.string().allow(""),
  secondAddressCoordinates: Joi.object().allow(null),
  secondAddressAdditional: Joi.string().allow("", null),
  cdsmsp: Joi.string().allow("", null),
  displayEmail: Joi.boolean().required(),
  email: Joi.string().email(),
  firstName: Joi.string().required(),
  languages: Joi.string().allow("", null),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  displayPhone: Joi.boolean().required(),
  public: Joi.string()
    .valid(...Object.values(PUBLIC))
    .required(),
  teleconsultation: Joi.boolean().required(),
  visible: Joi.boolean().required(),
  website: Joi.string()
    .uri({ scheme: ["http", "https"] })
    .allow("", null)
    .messages({
      "string.uriCustomScheme":
        "L'adresse du site web doit commencer par http:// ou https://",
    }),
}).messages({
  "string.empty": "{{#label}} ne peut pas être vide",
  "string.email": "L'email doit être valide. Exemple : test@example.org",
});

const coordinatesSchema = Joi.array().length(2).items(Joi.number()).required();

const coordinatesErrorMessage =
  "L'adresse postale du cabinet principal semble invalide. Veuillez la vérifier ou contacter l'équipe du support.";
const secondAddressCoordinatesErrorMessage =
  "L'adresse postale du second lieu d'exercice semble invalide. Veuillez la vérifier ou contacter l'équipe du support.";

export const updateIfExists = async (id: string, department: string, body) => {
  const existingPsychologist = await getOne(id, department);
  if (!existingPsychologist) return;

  const psy = filterAllowedKeys(body);
  await updateSchema.validateAsync(psy, {
    abortEarly: false,
  });
  const formattedPsy = await formatPsychologist(psy);
  // Fails when address was not empty and the given address did not return
  // coordinates on format (this validation is done after API address call).
  await coordinatesSchema
    .messages({ "any.required": coordinatesErrorMessage })
    .validateAsync(formattedPsy.coordinates?.coordinates);
  if (psy.secondAddress) {
    await coordinatesSchema
      .messages({ "any.required": secondAddressCoordinatesErrorMessage })
      .validateAsync(formattedPsy.secondAddressCoordinates?.coordinates);
  }

  return await update(id, formattedPsy);
};

const updatePsy = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    const id = req.query.id as string;

    const dep = session.user.isSuperAdmin
      ? ""
      : (session.user.department as string);
    const updated = await updateIfExists(id, dep, req.body);

    if (!updated) {
      return res.status(404).send("Psychologue non trouvé");
    }
    return res.status(200).send("Psychologue mis à jour");
  }
};

export default handleApiError(updatePsy);
