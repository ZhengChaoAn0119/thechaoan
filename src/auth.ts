import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// PostgresAdapter removed for local testing (JWT sessions, no DATABASE_URL needed).
// Re-add once DATABASE_URL is available:
//   import PostgresAdapter from "@auth/pg-adapter";
//   import { Pool } from "pg";
//   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//   adapter: PostgresAdapter(pool),
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
