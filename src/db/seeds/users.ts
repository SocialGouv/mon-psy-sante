import bcrypt from "bcryptjs";

import { models } from "../models";
import { groups } from "./psychologist";

const groupIds = groups.map((g) => g.id);
export const createUsers = async () => {
  const salt = await bcrypt.genSalt(10);

  const users = groupIds.map((group, index) => ({
    email: `${index}@test.fr`,
    group,
    password: bcrypt.hashSync(`password${index}`, salt),
  }));
  users.push({
    email: `admin@test.fr`,
    group: "admin",
    password: bcrypt.hashSync(`admin123`, salt),
  });
  await models.UserAccount.bulkCreate(users);
};
