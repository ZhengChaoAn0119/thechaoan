"use client";

import Image from "next/image";
import Link from "next/link";

interface UserMenuProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  locale: string;
}

export default function UserMenu({ user, locale }: UserMenuProps) {
  return (
    <div className="relative group">
      {user.image ? (
        <Image
          src={user.image}
          alt={user.name ?? "User"}
          width={32}
          height={32}
          className="rounded-full object-cover cursor-pointer"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center cursor-pointer">
          <span className="text-xs text-zinc-300">
            {user.name?.[0]?.toUpperCase() ?? "?"}
          </span>
        </div>
      )}

      <div className="absolute right-0 top-full mt-2 w-52 bg-zinc-950 border border-zinc-800 rounded-xl p-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="flex flex-col gap-0.5">
          {user.name && (
            <p className="text-sm text-white font-medium truncate">{user.name}</p>
          )}
          {user.email && (
            <p className="text-xs text-zinc-500 truncate">{user.email}</p>
          )}
        </div>

        <div className="border-t border-zinc-800 my-3" />

        <Link
          href={`/${locale}/logout`}
          className="text-xs text-zinc-400 hover:text-white transition-colors"
        >
          Sign out
        </Link>
      </div>
    </div>
  );
}
