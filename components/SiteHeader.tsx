import Link from "next/link";
import { profile } from "@/data/profile";

// 모든 페이지 상단에 붙는 공통 내비게이션 (app/layout.tsx에서 렌더)
// 반투명 배경 + 블러로 스크롤해도 위에 떠 있는 얇은 바
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline/50 bg-canvas/80 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight text-ink">
          {profile.name}
        </Link>
        <nav className="flex items-center gap-6 text-xs text-ink/80">
          <Link href="/#about" className="transition-colors hover:text-ink">
            소개
          </Link>
          <Link href="/#projects" className="transition-colors hover:text-ink">
            프로젝트
          </Link>
          <Link href="/guestbook" className="transition-colors hover:text-ink">
            방명록
          </Link>
          {profile.githubUrl.startsWith("http") && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-ink"
            >
              GitHub
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
