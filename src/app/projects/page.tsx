import type { Metadata } from "next";
import { Suspense } from "react";
import { allContent } from "@/lib/data";
import ContentGrid from "../components/ContentGrid";

export const metadata: Metadata = {
  title: "Projects — ChaoAn Zheng",
  description: "A portfolio of work, side projects, and experiments.",
};

const projects = allContent.filter((item) => item.type === "project");

export default function ProjectsPage() {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col gap-12">
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
