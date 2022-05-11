import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      if (!token) return false;
      const roles = token.roles as string[];
      return roles.includes("admin") || roles.includes("super-admin");
    },
  },
});
