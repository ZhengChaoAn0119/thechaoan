import type { Metadata } from "next";
import { Suspense } from "react";
import { allContent } from "@/lib/data";
import { getT } from "@/lib/i18n";
import ContentGrid from "../../components/ContentGrid";

export const metadata: Metadata = {
  title: "Projects — ChaoAn Zheng",
  description: "A portfolio of work, side projects, and experiments.",
};

const projects = allContent.filter((item) => item.type === "project");

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getT(locale);

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col gap-12">
      <div className="flex flex-col gap-3">
        <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-400">
          work
        </p>
        <h1 className="text-5xl font-semibold text-black">
          {t("projects.title")}
        </h1>
        <p className="text-sm text-zinc-500 max-w-md">
          {t("projects.subtitle")}
        </p>
      </div>

      <Suspense>
        <ContentGrid items={projects} />
      </Suspense>
    </div>
  );
}
