import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser } from "@/lib/firestore";

export async function POST(req: Request) {
  const { email, password, recaptchaToken } = await req.json();

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(recaptchaToken)}`,
  });
  const verifyData = await verifyRes.json();

  if (!verifyData.success) {
    return NextResponse.json({ error: "CAPTCHA verification failed" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await createUser({ email, passwordHash });

  return NextResponse.json({ success: true });
}
