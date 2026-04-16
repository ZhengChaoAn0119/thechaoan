import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // 引入 Next.js 的連結組件
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        {/* --- 第一部分：品牌與社群 (Upper Tier) --- */}
        <header className="w-full border-b border-zinc-900">
          <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
            {/* 左側：頭像或品牌圖 (暫用佔位圓圈) */}
            <Link href="/" className="group">
              <div className="w-10 h-10 bg-zinc-800 rounded-full transition-all group-hover:ring-2 group-hover:ring-zinc-600" />
            </Link>

            {/* 中間：網頁標題 (Dan Koe 風格通常是大寫、字距寬) */}
            <Link href="/">
              <h1 className="text-sm font-bold tracking-[0.3em] uppercase">
                ChaoAn Zheng
              </h1>
            </Link>

            {/* 右側：社群 Icon 佔位 (可之後換成 react-icons) */}
            <div className="flex gap-4 text-zinc-500">
              <span className="cursor-pointer hover:text-white transition-colors text-xs">TW</span>
              <span className="cursor-pointer hover:text-white transition-colors text-xs">GH</span>
            </div>
          </div>

          {/* --- 第二部分：導航選單 (Lower Tier) --- */}
          <nav className="w-full border-t border-zinc-900/50">
            <ul className="flex justify-center gap-10 py-4 text-[11px] font-bold tracking-widest text-zinc-500 uppercase">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/resume" className="hover:text-white transition-colors">Resume</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
            </ul>
          </nav>
        </header>

        {/* 主要內容區 */}
        <main className="flex-1">
          {children}
        </main>

        {/* 頁尾 (可選) */}
        <footer className="py-10 text-center text-zinc-600 text-[10px] tracking-widest uppercase">
          © 2026 ChaoAn Zheng — Built with Next.js
        </footer>
      </body>
    </html>
  );
}