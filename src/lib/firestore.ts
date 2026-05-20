import { db } from "./firebase-admin";

export async function createUser(data: { email: string; passwordHash: string }): Promise<void> {
  if (!db) throw new Error("Firestore is not initialized");
  await db.collection("users").add({
    email: data.email,
    passwordHash: data.passwordHash,
    createdAt: new Date(),
  });
}
