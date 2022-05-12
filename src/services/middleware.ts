export const authorize = (token): boolean => {
  if (!token) return false;
  console.log("verif middleware", token);
  const roles = token.roles || [];
  console.log(
    "roles",
    roles,
    roles.includes("admin") || roles.includes("super-admin")
  );

  return roles.includes("admin") || roles.includes("super-admin");
};
