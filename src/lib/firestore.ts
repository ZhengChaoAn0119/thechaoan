import { db } from "./firebase-admin";

export async function createUser(data: { email: string; passwordHash: string }): Promise<void> {
  if (!db) throw new Error("Firestore is not initialized");
  await db.collection("users").add({
    email: data.email,
    passwordHash: data.passwordHash,
    createdAt: new Date(),
  });
}

export async function getUserByEmail(
  email: string
): Promise<{ id: string; email: string; passwordHash: string } | null> {
  if (!db) throw new Error("Firestore is not initialized");
  const snap = await db.collection("users").where("email", "==", email).limit(1).get();
  if (snap.empty) return null;
  const doc = snap.docs[0];
  return { id: doc.id, ...(doc.data() as { email: string; passwordHash: string }) };
}
