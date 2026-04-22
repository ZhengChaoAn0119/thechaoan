import type { Metadata } from "next";
import { Suspense } from "react";
import { allContent } from "@/lib/data";
import ContentGrid from "../components/ContentGrid";

export const metadata: Metadata = {
  title: "Blog — ChaoAn Zheng",
  description:
    "Writing, notes, and things I'm learning about code and systems.",
};

const posts = allContent.filter((item) => item.type === "blog");

export default function BlogPage() {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col gap-12">
      {/* Title */}
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-400">
          Writing
        </p>
        <h1 className="text-5xl font-semibold text-black">Blog</h1>
        <p className="text-sm text-zinc-500 max-w-md">
          Notes on code, systems thinking, and the craft of building things.
        </p>
      </div>

      {/* Filter + Cards */}
      <Suspense>
        <ContentGrid items={posts} />
      </Suspense>
    </div>
  );
}
