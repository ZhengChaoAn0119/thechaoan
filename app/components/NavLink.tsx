"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={
        isActive
          ? "text-zinc-500 text-[13px] font-black tracking-widest uppercase border-b-2 border-zinc-500 pb-2 transition-colors"
          : "text-zinc-500 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
      }
    >
      {label}
    </Link>
  );
}
