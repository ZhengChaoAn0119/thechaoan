import NextAuth from "next-auth";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { authConfig } from "./auth.config";
import { db } from "@/lib/firebase-admin";

const useAdapter = db && process.env.USE_FIRESTORE_ADAPTER !== "false";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  ...(useAdapter
    ? { adapter: FirestoreAdapter(db!), session: { strategy: "database" } }
    : { session: { strategy: "jwt" } }),
});
