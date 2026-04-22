"use client";

import { Search } from "lucide-react";

type Tab = "latest" | "top";

interface FilterBarProps {
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  rawQuery: string;
  onQueryChange: (value: string) => void;
}

export default function FilterBar({
  tab,
  onTabChange,
  rawQuery,
  onQueryChange,
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-2 border border-zinc-200 rounded-md p-1 bg-white">
        {(["latest", "top"] as const).map((t) => (
          <button
            key={t}
            onClick={() => onTabChange(t)}
            aria-pressed={tab === t}
            className={`px-3 py-1.5 text-xs font-semibold tracking-wide uppercase transition-colors duration-200 rounded-md ${tab === t
              ? "bg-[#F5F1E8] text-black"
              : "text-zinc-500 hover:text-black hover:bg-zinc-100"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="relative flex-1 max-w-xs">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
          aria-hidden="true"
        />
        <input
          type="search"
          value={rawQuery}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search..."
          aria-label="Search content"
          className="w-full bg-white border border-zinc-300 rounded-full py-2 pl-8 pr-4 text-sm text-zinc-300 placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
        />
      </div>
    </div>
  );
}
