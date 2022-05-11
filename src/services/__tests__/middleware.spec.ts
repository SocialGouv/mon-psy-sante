import { authorize } from "../middleware";

describe("middleware", () => {
  it.each`
    token
    ${undefined}
    ${null}
    ${""}
    ${{}}
    ${{ roles: undefined }}
    ${{ roles: [] }}
    ${{ roles: ["not-authorized"] }}
  `("authorize should return false if token is $token", async ({ token }) => {
    await expect(authorize(token)).toEqual(false);
  });

  it.each`
    roles
    ${["admin"]}
    ${["admin", "other"]}
    ${["super-admin"]}
    ${["super-admin", "other"]}
    ${["super-admin", "admin", "other"]}
  `(
    "authorize should return true if token has roles $roles",
    async ({ roles }) => {
      await expect(authorize({ roles: roles })).toEqual(true);
    }
  );
});
