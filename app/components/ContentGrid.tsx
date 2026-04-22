"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "../hooks/useDebounce";
import FilterBar from "./FilterBar";
import ContentCard from "./ContentCard";

export type ContentItem = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image?: string;
  tag: string;
  featured?: boolean;
};

type Tab = "latest" | "top";

export default function ContentGrid({ items }: { items: ContentItem[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = (searchParams.get("tab") ?? "latest") as Tab;
  const initialQuery = searchParams.get("q") ?? "";

  const [tab, setTab] = useState<Tab>(initialTab);
  const [rawQuery, setRawQuery] = useState(initialQuery);

  const debouncedQuery = useDebounce(rawQuery, 300);

  useEffect(() => {
    const params = new URLSearchParams();
    if (tab !== "latest") params.set("tab", tab);
    if (debouncedQuery) params.set("q", debouncedQuery);
    const qs = params.toString();
    router.replace(qs ? `?${qs}` : "?", { scroll: false });
  }, [tab, debouncedQuery, router]);

  const filtered = useMemo(() => {
    const q = debouncedQuery.toLowerCase();
    return items
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.excerpt.toLowerCase().includes(q) ||
          item.tag.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        if (tab === "top") {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        const aTime = a.date === "coming-soon" ? 0 : new Date(a.date).getTime();
        const bTime = b.date === "coming-soon" ? 0 : new Date(b.date).getTime();
        return bTime - aTime;
      });
  }, [items, debouncedQuery, tab]);

  return (
    <div className="flex flex-col gap-8">
      <FilterBar
        tab={tab}
        onTabChange={setTab}
        rawQuery={rawQuery}
        onQueryChange={setRawQuery}
      />

      <div className="flex flex-col gap-3 w-full">
        {filtered.length === 0 ? (
          <p className="text-center py-16 text-zinc-600 text-sm">
            No results found.
          </p>
        ) : (
          filtered.map((item) => <ContentCard key={item.slug} item={item} />)
        )}
      </div>
    </div>
  );
}
