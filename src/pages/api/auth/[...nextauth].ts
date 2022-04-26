import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { login } from "../../../services/userAccount";

const options = {
  callbacks: {
    async jwt({ token, user }) {
      return {
        ...token,
        ...user,
      };
    },
    redirect: ({ url }) => url || "/administration-annuaire",
    async session({ session, token }) {
      if (token) {
        return {
          ...session,
          user: {
            email: token.email,
            group: token.group,
          },
        };
      }
      return session;
    },
  },
  pages: {
    error: "/administration-annuaire/connexion",
    signIn: "/administration-annuaire/connexion",
  },
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const connexion = await login(credentials.email, credentials.password);
        if (connexion.success) {
          return connexion.user;
        }
        throw new Error("Veuillez verifier votre email ou mot de passe.");
      },
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      name: "Credentials",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(options);
