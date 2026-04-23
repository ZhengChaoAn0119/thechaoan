import Image from "next/image";
import Link from "next/link";
import type { ContentItem } from "@/lib/data";

export default function ContentCard({ item, locale }: { item: ContentItem; locale: string }) {
  const displayDate =
    item.date === "coming-soon"
      ? "Coming soon"
      : new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });

  const section = item.type === "blog" ? "blog" : "projects";
  const href = item.slug ? `/${locale}/${section}/${item.slug}` : "#";

  return (
    <Link
      href={href}
      className="group flex flex-row items-center gap-4 w-full rounded-xl border border-zinc-200 overflow-hidden hover:border-zinc-600 transition-all hover:shadow-md p-4"
    >
      {/* Body */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <span className="sr-only">{item.tag}</span>
        <h4 className="text-black font-semibold leading-snug group-hover:text-indigo-400 transition-colors line-clamp-2">
          {item.title}
        </h4>
        <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
          {item.excerpt}
        </p>
        <span className="text-[10px] text-zinc-700 tracking-widest uppercase mt-1">
          {displayDate}
        </span>
      </div>

      {/* Thumbnail — right side */}
      <div className="relative shrink-0 w-32 aspect-[4/3] rounded-lg overflow-hidden bg-zinc-100">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover opacity-80 transition-none"
          />
        ) : (
          <Image
            src="/error404.png"
            alt="Image not found"
            fill
            className="object-cover opacity-80 transition-none"
          />
        )}
      </div>
    </Link>
  );
}
