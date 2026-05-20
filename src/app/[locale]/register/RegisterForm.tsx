"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { signIn } from "next-auth/react";

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
    errorPasswordWeak:
      "Password must include at least 3 of: uppercase, lowercase, number, special character.",
    errorEmailInvalid: "Please enter a valid email address.",
    errorEmailTaken: "This email is already registered.",
    errorGeneral: "Registration failed. Please try again.",
    forgotPassword: "Forgot password?",
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
    errorPasswordWeak: "密碼需包含大寫字母、小寫字母、數字、特殊字元中至少三種。",
    errorEmailInvalid: "請輸入有效的電子郵件地址。",
    errorEmailTaken: "此電子郵件已被註冊。",
    errorGeneral: "註冊失敗，請再試一次。",
    forgotPassword: "忘記密碼？",
  },
} as const;

const EyeOpen = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

export default function RegisterForm({ locale }: Props) {
  const t = messages[locale as keyof typeof messages] ?? messages.en;
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);

  function validatePasswordStrength(val: string): string | null {
    if (val.length === 0) return null;
    if (val.length < 8) return t.errorPasswordShort;
    const types = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^a-zA-Z0-9]/].filter((r) => r.test(val)).length;
    if (types < 3) return t.errorPasswordWeak;
    return null;
  }

  async function handleEmailBlur() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    const res = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    setEmailError(data.taken ? t.errorEmailTaken : null);
  }

  function handlePasswordChange(val: string) {
    setPassword(val);
    setPasswordError(validatePasswordStrength(val));
    if (confirmPassword.length > 0) {
      setConfirmPasswordError(val !== confirmPassword ? t.errorPasswordMismatch : null);
    }
  }

  function handleConfirmPasswordChange(val: string) {
    setConfirmPassword(val);
    setConfirmPasswordError(val.length > 0 && val !== password ? t.errorPasswordMismatch : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t.errorEmailInvalid);
      return;
    }
    if (emailError || passwordError || confirmPasswordError) return;
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
        const errorMessage =
          data.error === "EMAIL_TAKEN" ? t.errorEmailTaken : (data.error ?? t.errorGeneral);
        setError(errorMessage);
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
        return;
      }
      await signIn("credentials", { email, password, redirect: false });
      router.push(`/${locale}`);
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
          <div>
            <input
              type="email"
              placeholder={t.email}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(null); }}
              onBlur={handleEmailBlur}
              required
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            />
            {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t.password}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                required
                className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 pr-9 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
            {passwordError && <p className="text-red-400 text-xs mt-1">{passwordError}</p>}
          </div>

          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder={t.confirmPassword}
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                required
                className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-2 pr-9 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                tabIndex={-1}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
            {confirmPasswordError && (
              <p className="text-red-400 text-xs mt-1">{confirmPasswordError}</p>
            )}
          </div>

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

        <div className="flex justify-center gap-4">
          <Link
            href={`/${locale}`}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {t.backToLogin}
          </Link>
          <Link
            href={`/${locale}/forgot-password`}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {t.forgotPassword}
          </Link>
        </div>
      </div>
    </div>
  );
}
