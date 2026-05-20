import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/lib/firestore";

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

  const existing = await getUserByEmail(email);
  if (existing) {
    return NextResponse.json({ error: "EMAIL_TAKEN" }, { status: 409 });
  }

  const types = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((r) => r.test(password)).length;
  if (password.length < 8 || types < 3) {
    return NextResponse.json({ error: "WEAK_PASSWORD" }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await createUser({ email, passwordHash });

  return NextResponse.json({ success: true });
}
