import type { Metadata } from "next";
import { Suspense } from "react";
import ContentGrid, { ContentItem } from "../components/ContentGrid";

export const metadata: Metadata = {
  title: "Blog — ChaoAn Zheng",
  description:
    "Writing, notes, and things I'm learning about code and systems.",
};

const posts: ContentItem[] = [
  {
    slug: "#",
    title: "Getting Started with Next.js App Router",
    excerpt:
      "A deep dive into the App Router paradigm — layouts, server components, streaming, and how it changes the way you think about data fetching.",
    date: "2026-04-10",
    image: "/error404.png",
    tag: "Next.js",
    featured: false,
  },
  {
    slug: "#",
    title: "Tailwind CSS Design System Tips",
    excerpt:
      "How to use Tailwind effectively at scale: design tokens, component patterns, and avoiding the utility-class sprawl trap.",
    date: "2026-03-18",
    tag: "CSS",
    featured: true,
  },
  {
    slug: "#",
    title: "First Post on the Way",
    excerpt: "Notes on code, thinking, and craft — stay tuned.",
    date: "coming-soon",
    tag: "Meta",
    featured: false,
  },
];

export default function BlogPage() {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col gap-12">
      {/* Title */}
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-400">
          Writing
        </p>
        <h1 className="text-5xl font-semibold text-black">
          Blog
        </h1>
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
