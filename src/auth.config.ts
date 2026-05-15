import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig: NextAuthConfig = {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      if (session.user) {
        // JWT strategy: token.sub holds the provider user ID
        // Database strategy: user.id holds the database user ID
        session.user.id =
          token?.sub ?? (user as { id?: string } | undefined)?.id ?? "";
      }
      return session;
    },
  },
};
