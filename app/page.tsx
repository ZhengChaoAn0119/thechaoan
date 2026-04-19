import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center">

      {/* ── Hero ─────────────────────────────────────────────── */}
      {/* 1:4:1 ratio on large screens — w-2/3 = 4 parts, auto margins = 1 part each */}
      <section className="w-full lg:w-2/3 mx-auto px-6 pt-6 pb-10">
        <div className="relative w-full overflow-hidden rounded-2xl px-8 py-16 sm:px-20">

          {/* Background image confined to the card */}
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

          {/* Text content — left-aligned */}
          <div className="flex flex-col items-start text-left gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-4xl font-bold tracking-tight text-white drop-shadow-md">
                ChaoAn Zheng
              </h2>
              <p className="text-lg text-zinc-300 leading-relaxed max-w-sm drop-shadow-sm">
                Developer &amp; lifelong learner. Writing about code, systems
                thinking, and building things that matter.
              </p>
            </div>

            <p className="text-[10px] text-zinc-400 tracking-[0.3em] uppercase">
              — building in public —
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/projects"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-all hover:scale-105"
              >
                View Projects
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/about"
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 bg-black/20 backdrop-blur-sm text-zinc-300 text-sm font-medium hover:border-zinc-500 hover:text-white transition-all"
              >
                About Me
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
            Latest Writing
          </h3>
          <Link
            href="/blog"
            className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors tracking-wide"
          >
            View all →
          </Link>
        </div>

        <div className="flex flex-col">
          {[
            {
              slug: "#",
              date: "Coming soon",
              title: "First post on the way",
              excerpt: "Notes on code, thinking, and craft — stay tuned.",
            },
          ].map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col gap-1 border-b border-zinc-900 py-6 first:pt-0"
            >
              <span className="text-[11px] text-zinc-600 tracking-widest uppercase">
                {post.date}
              </span>
              <Link href={post.slug}>
                <h4 className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h4>
              </Link>
              <p className="text-sm text-zinc-500">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Featured Projects ────────────────────────────────── */}
      <section className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500">
            Projects
          </h3>
          <Link
            href="/projects"
            className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors tracking-wide"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              slug: "#",
              title: "Personal Website",
              stack: "Next.js · Tailwind",
              desc: "This site — built with Next.js 14 App Router and Tailwind CSS.",
            },
          ].map((project) => (
            <Link
              key={project.slug}
              href={project.slug}
              className="group flex flex-col gap-2 rounded-xl border border-zinc-800 p-5 hover:border-zinc-600 transition-colors"
            >
              <span className="text-[11px] text-zinc-600 tracking-widest uppercase">
                {project.stack}
              </span>
              <h4 className="text-white font-medium group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h4>
              <p className="text-sm text-zinc-500">{project.desc}</p>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}
