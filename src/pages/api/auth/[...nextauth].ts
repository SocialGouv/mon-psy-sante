import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

import config from "../../../services/config";

console.log(
  process.env.NEXTAUTH_URL,
  process.env.NEXTAUTH_SECRET,
  config.keycloak.clientId,
  config.keycloak.clientSecret,
  config.keycloak.issuer
);

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      else if (new URL(url).origin === "http://localhost:3000") {
        const newUrl = new URL(url);
        newUrl.hostname = new URL(baseUrl).hostname;
        newUrl.protocol = new URL(baseUrl).protocol;
        return newUrl.toString();
      }
    },
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
          isSuperAdmin: roles.includes("super-admin"),
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
});
