import NextAuth from "next-auth";

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
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(options);
