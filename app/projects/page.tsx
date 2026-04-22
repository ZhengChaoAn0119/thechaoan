import type { Metadata } from "next";
import { Suspense } from "react";
import ContentGrid, { ContentItem } from "../components/ContentGrid";

export const metadata: Metadata = {
  title: "Projects — ChaoAn Zheng",
  description: "A portfolio of work, side projects, and experiments.",
};

const projects: ContentItem[] = [
  {
    slug: "#",
    title: "Personal Website",
    excerpt:
      "This site — built with Next.js 14 App Router, Tailwind CSS, and MDX. A personal brand and portfolio platform.",
    date: "2026-04-01",
    tag: "Next.js · Tailwind",
    featured: true,
  },
  {
    slug: "#",
    title: "Portfolio v1",
    excerpt:
      "The first iteration of my portfolio, built with plain React and CSS Modules. A learning exercise in component architecture.",
    date: "2026-01-15",
    tag: "React",
    featured: false,
  },
];

export default function ProjectsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-16 flex flex-col gap-12">
      {/* Title */}
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-400">
          Work
        </p>
        <h1 className="text-5xl font-semibold text-black">Projects</h1>
        <p className="text-sm text-zinc-500 max-w-md">
          Things I've built — side projects, experiments, and work that matters.
        </p>
      </div>

      {/* Filter + Cards */}
      <Suspense>
        <ContentGrid items={projects} />
      </Suspense>
    </div>
  );
}
