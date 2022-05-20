import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { handleApiError } from "../../../../services/api";
import { formatPsychologist } from "../../../../services/format-psychologists";
import { getOne, update } from "../../../../services/psychologists";
import { Psychologist } from "../../../../types/psychologist";

const updateSchema = Joi.object({
  address: Joi.string().required(),
  coordinates: Joi.object(),
  addressAdditional: Joi.string().allow("").allow(null),
  secondAddress: Joi.string().allow(""),
  secondAddressCoordinates: Joi.object(),
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
const UPDATABLE_KEYS = [
  "address",
  "addressAdditional",
  "secondAddress",
  "secondAddressAdditional",
  "cdsmsp",
  "coordinates",
  "secondAddressCoordinates",
  "displayEmail",
  "email",
  "firstName",
  "languages",
  "lastName",
  "phone",
  "displayPhone",
  "public",
  "teleconsultation",
  "visible",
  "website",
];

export const filterAllowedKeys = (
  psy: Partial<Psychologist>
): Partial<Psychologist> => {
  return Object.keys(psy)
    .filter((key) => UPDATABLE_KEYS.includes(key))
    .reduce((obj, key) => {
      obj[key] = psy[key];
      return obj;
    }, {});
};
export const updateIfExists = async (id: string, department: string, body) => {
  const existingPsychologist = await getOne(id, department);
  if (!existingPsychologist) return;

  const psy = await formatPsychologist(filterAllowedKeys(body));
  await updateSchema.validateAsync(psy, {
    abortEarly: false,
  });

  return await update(id, psy);
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
