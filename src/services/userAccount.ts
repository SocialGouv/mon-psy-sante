import bcrypt from "bcryptjs";

import { models } from "../db/models";
import { UserAccount, UserActionResponse } from "../types/userAccount";

export const login = async (
  email: string,
  password: string
): Promise<UserActionResponse> => {
  // @ts-ignore
  const user: UserAccount = await models.UserAccount.findOne({
    where: { email },
  });

  if (!user) {
    return { success: false };
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { success: false };
  }

  return {
    success: true,
    user: { email: user.email, group: user.group },
  };
};
