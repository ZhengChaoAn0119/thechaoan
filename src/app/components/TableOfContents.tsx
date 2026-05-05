"use client";

import { useEffect, useRef, useState } from "react";

type Heading = { level: number; id: string; text: string };

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headingEls = Array.from(
      document.querySelectorAll<HTMLElement>("article h1[id], article h2[id], article h3[id], article h4[id], article h5[id], article h6[id]")
    );

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 }
    );

    headingEls.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  if (headings.length === 0) return null;

  const indentClass: Record<number, string> = {
    1: "pl-0",
    2: "pl-0",
    3: "pl-3",
    4: "pl-5",
    5: "pl-5",
    6: "pl-5",
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 text-[10px] tracking-[0.2em] uppercase text-zinc-500">
        On this page
      </p>
      <ul className="flex flex-col gap-1.5">
        {headings.map((h) => (
          <li key={h.id} className={indentClass[h.level] ?? "pl-0"}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(h.id);
              }}
              className={`block text-xs leading-snug transition-all duration-150 ${
                activeId === h.id
                  ? "font-semibold text-zinc-100"
                  : "font-normal text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
