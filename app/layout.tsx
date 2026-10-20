import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} — 포트폴리오`,
  description: "Next.js + MongoDB로 만든 개인 포트폴리오",
};

// 서체는 globals.css의 시스템 서체 스택(--font-sans)을 씁니다.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full flex flex-col font-sans">
        <SiteHeader />
        {children}
        <footer className="mt-auto border-t border-hairline/60 py-8 text-center text-xs text-mute">
          Next.js 16 · MongoDB Atlas · Vercel
        </footer>
      </body>
    </html>
  );
}
