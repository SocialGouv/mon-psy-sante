export const authorize = (token): boolean => {
  if (!token) return false;
  const roles = token?.token?.roles || [];
  return roles.includes("admin") || roles.includes("super-admin");
};
