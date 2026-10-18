import Link from "next/link";
import { profile } from "@/data/profile";

// 모든 페이지 상단에 붙는 공통 내비게이션 (app/layout.tsx에서 렌더)
export function SiteHeader() {
  return (
    <header className="border-b border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm font-semibold">
          {profile.name}
        </Link>
        <nav className="flex items-center gap-5 text-sm text-zinc-600 dark:text-zinc-400">
          <Link href="/#projects" className="hover:text-black dark:hover:text-zinc-50">
            프로젝트
          </Link>
          <Link href="/guestbook" className="hover:text-black dark:hover:text-zinc-50">
            방명록
          </Link>
          {profile.githubUrl.startsWith("http") && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-zinc-50"
            >
              GitHub
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
