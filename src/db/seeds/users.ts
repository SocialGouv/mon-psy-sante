import bcrypt from "bcryptjs";

import { models } from "../../db/models";
import { groupIds } from "./psychologist";

export const createUsers = async () => {
  const salt = await bcrypt.genSalt(10);

  await models.UserAccount.bulkCreate(
    groupIds.map((group, index) => ({
      email: `${index}@test.fr`,
      group,
      password: bcrypt.hashSync(`admin${index}`, salt),
    }))
  );
};
