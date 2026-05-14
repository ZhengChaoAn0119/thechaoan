"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";

interface Props {
  locale: string;
}

const messages = {
  en: {
    title: "Create Account",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    submit: "Register",
    backToLogin: "Back to Login",
    errorCaptcha: "Please complete the CAPTCHA.",
    errorPasswordMismatch: "Passwords do not match.",
    errorPasswordShort: "Password must be at least 8 characters.",
    errorEmailInvalid: "Please enter a valid email address.",
    errorGeneral: "Registration failed. Please try again.",
  },
  "zh-TW": {
    title: "建立帳號",
    email: "電子郵件",
    password: "密碼",
    confirmPassword: "確認密碼",
    submit: "註冊",
    backToLogin: "返回首頁",
    errorCaptcha: "請完成人機驗證。",
    errorPasswordMismatch: "兩次密碼不一致。",
    errorPasswordShort: "密碼至少需 8 個字元。",
    errorEmailInvalid: "請輸入有效的電子郵件地址。",
    errorGeneral: "註冊失敗，請再試一次。",
  },
} as const;

export default function RegisterForm({ locale }: Props) {
  const t = messages[locale as keyof typeof messages] ?? messages.en;
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.errorEmailInvalid);
      return;
    }
    if (password.length < 8) {
      setError(t.errorPasswordShort);
      return;
    }
    if (password !== confirmPassword) {
      setError(t.errorPasswordMismatch);
      return;
    }
    if (!captchaToken) {
      setError(t.errorCaptcha);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, recaptchaToken: captchaToken }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? t.errorGeneral);
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
        return;
      }
      router.push(`/${locale}/register/success`);
    } catch {
      setError(t.errorGeneral);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl w-full max-w-sm mx-4 p-8 flex flex-col gap-5">
        <h2 className="text-sm font-bold tracking-widest uppercase text-zinc-200 text-center">
          {t.title}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          />
          <input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          />
          <input
            type="password"
            placeholder={t.confirmPassword}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
          />

          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
              onChange={(token) => setCaptchaToken(token)}
              theme="dark"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white text-xs font-bold tracking-widest uppercase rounded py-2 transition-colors"
          >
            {loading ? "…" : t.submit}
          </button>
        </form>

        <div className="flex justify-center">
          <Link
            href={`/${locale}`}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {t.backToLogin}
          </Link>
        </div>
      </div>
    </div>
  );
}
