import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

import config from "../../../services/config";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, profile }) {
      return {
        ...token,
        roles: profile?.role || token?.roles,
        department:
          (profile?.user as { department?: string })?.department ||
          token?.department,
      };
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          department: token?.department,
          roles: token?.roles,
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
        console.log(profile);
        return {
          id: profile.sub,
          name: profile.name ?? profile.preferred_username,
          email: profile.email || "test@test.com",
          image: profile.picture,
          department: profile.user.department,
          roles: profile.user.roles,
          group: profile.user.group,
        };
      },
    }),
  ],
  secret: config.nextAuth.secret,
});
