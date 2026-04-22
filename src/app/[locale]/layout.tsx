import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import NavLink from "../components/NavLink";
import { getT } from "@/lib/i18n";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChaoAn Zheng",
  description: "Personal website of ChaoAn",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const t = getT(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <header className="w-full border-b border-zinc-900">
          <div className="max-w-1xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link href={`/${locale}`} className="group">
              <div className="w-10 h-10 relative rounded-full overflow-hidden transition-all">
                <Image
                  src="/avatar.png"
                  alt="ChaoAn's Avatar"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <Link href={`/${locale}`}>
              <h1 className="text-sm font-bold tracking-[0.3em] uppercase">
                ChaoAn Zheng
              </h1>
            </Link>

            <div className="flex gap-4 text-zinc-500">
              <Link
                href="/zh-TW"
                className={`text-xs transition-colors hover:text-white ${locale === "zh-TW" ? "text-white" : ""}`}
              >
                TW
              </Link>
              <Link
                href="/en"
                className={`text-xs transition-colors hover:text-white ${locale === "en" ? "text-white" : ""}`}
              >
                EN
              </Link>
            </div>
          </div>

          <nav className="w-full border-t border-zinc-900/50">
            <ul className="flex justify-center items-end gap-10 py-4">
              <li><NavLink href={`/${locale}`} label={t("nav.home")} /></li>
              <li><NavLink href={`/${locale}/aboutme`} label={t("nav.about")} /></li>
              <li><NavLink href={`/${locale}/blog`} label={t("nav.blog")} /></li>
              <li><NavLink href={`/${locale}/projects`} label={t("nav.projects")} /></li>
            </ul>
          </nav>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="py-10 text-center text-zinc-600 text-[10px] tracking-widest uppercase">
          © 2026 ChaoAn Zheng — {t("footer.credit")}
        </footer>
      </body>
    </html>
  );
}
