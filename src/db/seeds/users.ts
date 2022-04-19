import bcrypt from "bcryptjs";

import { models } from "../models";
import { groups } from "./psychologist";

const groupIds = groups.map((g) => g.id);
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
