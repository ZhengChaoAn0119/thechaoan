import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allContent } from "@/lib/data";
import { getT } from "@/lib/i18n";
import ContentCard from "../components/ContentCard";

const latestPosts = allContent
  .filter((item) => item.type === "blog" && item.date !== "coming-soon")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 2);

const latestProject = allContent
  .filter((item) => item.type === "project")
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 1);

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getT(locale);

  return (
    <div className="flex flex-col items-center">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="w-full lg:w-2/3 mx-auto px-6 pt-6 pb-10">
        <div className="relative w-full overflow-hidden rounded-2xl px-8 sm:px-20 h-92 flex items-center">

          <div className="absolute inset-0 -z-10">
            <Image
              src="/hero-bg.png"
              alt="Background"
              fill
              className="object-cover object-right opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          </div>

          <div className="flex flex-col items-start text-left gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-md">
                {t("home.hero_name")}
              </h2>
              <p className="text-lg text-zinc-300 leading-relaxed max-w-sm drop-shadow-sm ">
                {t("home.hero_subtitle")}
              </p>
            </div>

            <p className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase">
              {t("home.building_in_public")}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href={`/${locale}/projects`}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all hover:scale-105"
              >
                {t("home.cta_projects")}
                <ArrowRight size={14} />
              </Link>
              <Link
                href={`/${locale}/aboutme`}
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 bg-black/20 backdrop-blur-sm text-zinc-300 text-sm font-medium hover:border-zinc-500 hover:text-white transition-all"
              >
                {t("home.cta_about")}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Latest Writing ───────────────────────────────────── */}
      <section className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500">
            {t("home.section_writing")}
          </h3>
          <Link
            href={`/${locale}/blog`}
            className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors tracking-wide"
          >
            {t("home.view_all")}
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {latestPosts.map((post) => (
            <ContentCard key={post.slug} item={post} />
          ))}
        </div>
      </section>

      {/* ── Featured Projects ────────────────────────────────── */}
      <section className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500">
            {t("home.section_projects")}
          </h3>
          <Link
            href={`/${locale}/projects`}
            className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors tracking-wide"
          >
            {t("home.view_all")}
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {latestProject.map((project) => (
            <ContentCard key={project.slug} item={project} />
          ))}
        </div>
      </section>

    </div>
  );
}
