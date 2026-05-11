import NextAuth from "next-auth";
import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import { authConfig } from "./auth.config";

// Pool is only created when DATABASE_URL is set (production / local PG).
// Falls back to JWT sessions when DATABASE_URL is absent (local dev without PG).
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : undefined;

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  ...(pool ? { adapter: PostgresAdapter(pool) } : {}),
});
