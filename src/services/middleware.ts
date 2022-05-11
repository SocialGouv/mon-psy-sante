export const authorize = (token): boolean => {
  if (!token) return false;
  const roles = token.roles || [];
  return roles.includes("admin") || roles.includes("super-admin");
};
