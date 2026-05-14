"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  locale: string;
}

const messages = {
  en: {
    title: "Registration Successful",
    message: "Your account has been created.",
    redirecting: "Redirecting to home in",
    seconds: "seconds…",
  },
  "zh-TW": {
    title: "註冊成功",
    message: "您的帳號已建立。",
    redirecting: "將在",
    seconds: "秒後跳轉至首頁…",
  },
} as const;

export default function SuccessRedirect({ locale }: Props) {
  const t = messages[locale as keyof typeof messages] ?? messages.en;
  const router = useRouter();
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      router.push(`/${locale}`);
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, locale, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="text-zinc-200 text-sm font-bold tracking-widest uppercase">
          {t.title}
        </p>
        <p className="text-zinc-400 text-xs">{t.message}</p>
        <p className="text-zinc-600 text-xs">
          {t.redirecting} {count} {t.seconds}
        </p>
      </div>
    </div>
  );
}
