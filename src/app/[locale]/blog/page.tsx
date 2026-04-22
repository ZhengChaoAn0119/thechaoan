import type { Metadata } from "next";
import { Suspense } from "react";
import { allContent } from "@/lib/data";
import { getT } from "@/lib/i18n";
import ContentGrid from "../../components/ContentGrid";

export const metadata: Metadata = {
  title: "Blog — ChaoAn Zheng",
  description: "Writing, notes, and things I'm learning about code and systems.",
};

const posts = allContent.filter((item) => item.type === "blog");

export default async function BlogPage({
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
          {t("blog.eyebrow")}
        </p>
        <h1 className="text-5xl font-semibold text-black">
          {t("blog.title")}
        </h1>
        <p className="text-sm text-zinc-500 max-w-md">
          {t("blog.subtitle")}
        </p>
      </div>

      <Suspense>
        <ContentGrid items={posts} />
      </Suspense>
    </div>
  );
}
