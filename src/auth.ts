import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";

// Pool is only created when DATABASE_URL is set (production / local PG).
// Falls back to JWT sessions when DATABASE_URL is absent (local dev without PG).
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : undefined;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...(pool ? { adapter: PostgresAdapter(pool) } : {}),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
