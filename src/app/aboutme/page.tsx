import type { Metadata } from "next";
import { allTechCategories } from "../components/tech";

export const metadata: Metadata = {
  title: "About Me | ChaoAn Zheng",
  description: "Learn more about ChaoAn Zheng — developer, lifelong learner, building in public.",
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-16 flex flex-col gap-12">

      {/* ── Header ───────────────────────────────────────────── */}
      <section aria-labelledby="about-heading" className="flex flex-col gap-4">
        <p className="text-[11px] text-zinc-600 tracking-[0.25em] uppercase">
          — who I am —
        </p>
        <p className="text-zinc-400 leading-relaxed">
          I am Chaoan Zheng from Taoyuan, Taiwan. I have a background in architecture design with strong structured thinking and execution under pressure.
        </p>
        <p className="text-zinc-400 leading-relaxed">
          Focused on software engineering with Python, developing skills in computer vision and system development. Currently building image recognition projects covering data processing, model training, and deployment workflows.
        </p>
        <p className="text-zinc-400 leading-relaxed">
          Adaptable in choosing technologies based on problem requirements.
        </p>
        <p className="text-zinc-400 leading-relaxed">
          Future focus: Computer Vision, NLP, Full-stack, Cloud.
        </p>
      </section>

      {/* ── Stack ────────────────────────────────────────────── */}
      <section aria-labelledby="stack-heading" className="flex flex-col gap-8">
        <h2
          id="stack-heading"
          className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500"
        >
          Tech Stack
        </h2>
        {allTechCategories.map((category) => (
          <div key={category.label} className="flex flex-col gap-3">
            <h3 className="text-xs text-zinc-600 tracking-widest uppercase">
              {category.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {category.items.map((tech) => (
                <li
                  key={tech.name}
                  className="rounded-lg border border-zinc-800 px-3 py-1.5 text-sm text-zinc-400 hover:border-zinc-600 hover:text-white transition-colors"
                >
                  {tech.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* ── Contact ──────────────────────────────────────────── */}
      <section aria-labelledby="contact-heading" className="flex flex-col gap-4">
        <h2
          id="contact-heading"
          className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-500"
        >
          Contact
        </h2>
        <p className="text-sm text-zinc-400">
          Chat me.
        </p>
        <a
          href="mailto:ai6ru6boy@gmail.com"
          className="self-start text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          aria-label="Send email to ChaoAn Zheng"
        >
          ai6ru6boy@gmail.com →
        </a>
      </section>

    </div>
  );
}
