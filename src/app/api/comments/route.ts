import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  const { rows } = await pool.query(
    `SELECT c.id, c.body, c."createdAt", u.name, u.image
     FROM comments c JOIN users u ON u.id = c."userId"
     WHERE c.slug = $1 ORDER BY c."createdAt" ASC`,
    [slug]
  );
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug, body } = await req.json();
  if (!slug || !body?.trim())
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  const { rows } = await pool.query(
    `INSERT INTO comments (slug, "userId", body) VALUES ($1, $2, $3) RETURNING id, body, "createdAt"`,
    [slug, session.user.id, body.trim()]
  );
  return NextResponse.json(rows[0], { status: 201 });
}
