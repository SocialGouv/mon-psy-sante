import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

import config from "../../../services/config";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, ...rest }) {
      return {
        ...token,
        departement:
          (rest.profile?.user as { departement?: string })?.departement ||
          token?.departement,
      };
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          departement: token?.departement,
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
          departement: profile?.user?.departement,
        };
      },
    }),
  ],
  secret: config.nextAuth.secret,
});
