"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Comment {
  id: number;
  body: string;
  createdAt: string;
  name: string | null;
  image: string | null;
}

export default function CommentSection({ slug }: { slug: string }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then(setComments)
      .catch(() => {});
  }, [slug]);

  async function submit() {
    if (!draft.trim()) return;
    setSubmitting(true);
    const res = await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, body: draft }),
    });
    if (res.ok) {
      const c = await res.json();
      setComments((prev) => [
        ...prev,
        { ...c, name: session?.user?.name ?? null, image: session?.user?.image ?? null },
      ]);
      setDraft("");
    }
    setSubmitting(false);
  }

  return (
    <section className="mt-16 border-t border-zinc-800 pt-8 flex flex-col gap-6">
      <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-400">
        Comments
      </h2>
      {comments.length === 0 && (
        <p className="text-xs text-zinc-600">No comments yet.</p>
      )}
      {comments.map((c) => (
        <div key={c.id} className="flex flex-col gap-1">
          <span className="text-xs text-zinc-400 font-medium">
            {c.name ?? "Anonymous"}
          </span>
          <p className="text-sm text-zinc-300">{c.body}</p>
          <span className="text-[10px] text-zinc-600">
            {new Date(c.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
      {session?.user ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-sm text-white resize-none"
            rows={3}
            placeholder="Write a comment…"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button
            onClick={submit}
            disabled={submitting || !draft.trim()}
            className="self-end text-xs bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white px-4 py-1.5 rounded-lg transition-colors"
          >
            {submitting ? "Posting…" : "Post"}
          </button>
        </div>
      ) : (
        <p className="text-xs text-zinc-500">Sign in to leave a comment.</p>
      )}
    </section>
  );
}
