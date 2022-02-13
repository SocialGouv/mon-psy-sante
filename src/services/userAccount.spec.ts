import bcrypt from "bcryptjs";

import { models } from "../db/models";
import { login } from "./userAccount";

describe("Service userAccount", () => {
  beforeAll(async () => {
    await models.UserAccount.destroy({ where: {} });
    const salt = await bcrypt.genSalt(10);
    await models.UserAccount.create({
      email: `test@test.fr`,
      group: "random",
      password: bcrypt.hashSync(`mdp`, salt),
    });
  });

  it("Should failed if user does not exist", async () => {
    const results = await login("pizza@ananas.fr", "mdp");
    expect(results.success).toEqual(false);
    expect(results.user).toEqual(undefined);
  });

  it("Should failed if password does not match", async () => {
    const results = await login("test@test.fr", "hackerman");
    expect(results.success).toEqual(false);
    expect(results.user).toEqual(undefined);
  });

  it("Should success and return user", async () => {
    const results = await login("test@test.fr", "mdp");
    expect(results.success).toEqual(true);
    expect(results.user).toEqual({ email: "test@test.fr", group: "random" });
  });
});
