"use client";

import { useState } from "react";
import LoginModal from "./LoginModal";

export default function LoginButton({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-zinc-300 hover:text-white rounded px-3 py-1 transition-colors"
      >
        Login
      </button>
      <LoginModal open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}
