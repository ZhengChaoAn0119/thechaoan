import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/firestore";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") ?? "";
  if (!email) return NextResponse.json({ taken: false });
  const user = await getUserByEmail(email);
  return NextResponse.json({ taken: !!user });
}
