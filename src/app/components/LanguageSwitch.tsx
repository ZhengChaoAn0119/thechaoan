"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

const locales: Locale[] = ["zh-TW", "en"];
const labels: Record<Locale, string> = { en: "EN", "zh-TW": "TW" };

export default function LanguageSwitch({ locale }: { locale: string }) {
  const pathname = usePathname();

  function buildHref(target: Locale): string {
    const segments = pathname.split("/");
    segments[1] = target;
    return segments.join("/");
  }

  return (
    <div className="flex gap-4 text-zinc-500">
      {locales.map((l) => (
        <Link
          key={l}
          href={buildHref(l)}
          className={`text-xs transition-colors hover:text-white ${
            locale === l ? "text-white" : ""
          }`}
        >
          {labels[l]}
        </Link>
      ))}
    </div>
  );
}
