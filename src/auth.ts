import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { authConfig } from "./auth.config";
import { db } from "@/lib/firebase-admin";
import { getUserByEmail } from "@/lib/firestore";

const useAdapter = db && process.env.USE_FIRESTORE_ADAPTER === "true";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await getUserByEmail(credentials.email as string);
        if (!user) return null;
        const valid = await bcrypt.compare(credentials.password as string, user.passwordHash);
        if (!valid) return null;
        return { id: user.id, email: user.email };
      },
    }),
  ],
  ...(useAdapter
    ? { adapter: FirestoreAdapter(db!), session: { strategy: "database" } }
    : { session: { strategy: "jwt" } }),
});
