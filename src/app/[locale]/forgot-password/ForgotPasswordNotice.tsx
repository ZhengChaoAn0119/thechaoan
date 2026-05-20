"use client";

import Link from "next/link";

interface Props {
  locale: string;
}

const messages = {
  en: {
    title: "Forgot Password",
    message: "Password reset isn't available yet. Please contact me directly and I'll reset it manually.",
    contact: "Contact me",
    backToLogin: "Back to Login",
  },
  "zh-TW": {
    title: "忘記密碼",
    message: "密碼重設功能尚未開放，請直接與我聯繫，我會手動為您重設。",
    contact: "聯絡我",
    backToLogin: "返回登入",
  },
} as const;

export default function ForgotPasswordNotice({ locale }: Props) {
  const t = messages[locale as keyof typeof messages] ?? messages.en;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-sm mx-4 p-8 flex flex-col gap-5 text-center">
        <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-200">
          {t.title}
        </h2>
        <p className="text-xs text-zinc-400 leading-relaxed">{t.message}</p>
        <a
          href="mailto:ai6ru6boy@gmail.com"
          className="text-xs text-zinc-300 hover:text-white transition-colors underline underline-offset-2"
        >
          {t.contact}
        </a>
        <Link
          href={`/${locale}`}
          className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          {t.backToLogin}
        </Link>
      </div>
    </div>
  );
}
