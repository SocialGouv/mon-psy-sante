import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

import config from "../../../services/config";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, profile }) {
      const user = profile?.user as any;
      return {
        ...token,
        roles: profile?.role || token?.roles,
        department: token?.department || user?.department,
      };
    },
    session({ session, token }) {
      const roles: string[] = token?.roles as string[];
      return {
        ...session,
        user: {
          ...session.user,
          department: token?.department || session.user.department,
          isAdmin: roles.includes("admin"),
          isSuperAdmin: roles.includes("superAdmin"),
        },
      };
    },
  },
  providers: [
    KeycloakProvider({
      clientId: config.keycloak.clientId,
      clientSecret: config.keycloak.clientSecret,
      issuer: config.keycloak.issuer,
      profile: async (profile) => {
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email || "test@test.com",
          image: profile.picture,
          department: profile.user?.department,
          group: profile.user?.group,
        };
      },
    }),
  ],
  secret: config.nextAuth.secret,
});
