"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  locale: string;
}

export default function LoginModal({ open, onClose, locale }: LoginModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={(e) => {
        if (!cardRef.current?.contains(e.target as Node)) onClose();
      }}
    >
      <div
        ref={cardRef}
        className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-sm mx-4 p-8 flex flex-col gap-5"
      >
        <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-200 text-center">
          Login
        </h2>

        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          />
        </div>

        <button
          type="button"
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold tracking-widest uppercase rounded py-2 transition-colors"
        >
          Login
        </button>

        <div className="flex justify-between text-xs text-zinc-500">
          <Link href={`/${locale}/register`} onClick={onClose} className="hover:text-zinc-300 transition-colors">
            Register
          </Link>
          <Link href={`/${locale}/forgot-password`} onClick={onClose} className="hover:text-zinc-300 transition-colors">
            Forgot password?
          </Link>
        </div>

        <div className="relative flex items-center gap-3">
          <div className="flex-1 border-t border-dashed border-zinc-700" />
          <span className="text-xs text-zinc-600 shrink-0">or</span>
          <div className="flex-1 border-t border-dashed border-zinc-700" />
        </div>

        <button
          type="button"
          onClick={async () => {
            const { signIn } = await import("next-auth/react");
            signIn("google");
          }}
          className="w-full bg-white hover:bg-zinc-100 text-zinc-900 text-sm font-medium rounded py-2 flex items-center justify-center gap-2 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
