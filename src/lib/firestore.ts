// TODO: Initialize Firebase Admin SDK and write to Firestore once credentials are added.
// Required env vars: FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL
// Required package: firebase-admin
export async function createUser(data: { email: string; passwordHash: string }): Promise<void> {
  console.log("[Firestore stub] createUser:", data.email);
}
