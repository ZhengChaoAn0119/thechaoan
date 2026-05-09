import type { Metadata } from "next";

export const metadata: Metadata = { title: "Auth Test" };

export default function TestAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
