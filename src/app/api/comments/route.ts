import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/firebase-admin";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug)
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  if (!db)
    return NextResponse.json({ error: "Firestore unavailable" }, { status: 503 });

  const snapshot = await db
    .collection("comments")
    .where("slug", "==", slug)
    .orderBy("createdAt", "asc")
    .get();

  const comments = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      body: data.body,
      createdAt: data.createdAt?.toDate().toISOString() ?? null,
      name: data.userName,
      image: data.userImage,
    };
  });

  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!db)
    return NextResponse.json({ error: "Firestore unavailable" }, { status: 503 });

  const { slug, body } = await req.json();
  if (!slug || !body?.trim())
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const now = new Date();
  const ref = await db.collection("comments").add({
    slug,
    userId: session.user.id,
    userName: session.user.name ?? null,
    userImage: session.user.image ?? null,
    body: body.trim(),
    createdAt: now,
  });

  return NextResponse.json(
    {
      id: ref.id,
      body: body.trim(),
      createdAt: now.toISOString(),
    },
    { status: 201 }
  );
}
