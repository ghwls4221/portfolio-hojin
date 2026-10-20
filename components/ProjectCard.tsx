import Image from "next/image";
import type { Project } from "@/lib/projects";

// 아직 채우지 않은 "TODO_..." 주소는 링크 버튼을 숨깁니다.
function isUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-[28px] bg-card shadow-[0_2px_24px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col items-center gap-4 px-6 pb-8 pt-12 text-center sm:px-12">
        {project.period && (
          <p className="text-sm font-semibold text-mute">{project.period}</p>
        )}
        <h3 className="text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {project.title}
        </h3>
        <p className="max-w-2xl text-balance text-base leading-7 text-mute sm:text-lg">
          {project.summary}
        </p>

        {/* 주요 버튼 — 파란 알약 버튼 + 텍스트 링크 */}
        {(isUrl(project.repoUrl) || isUrl(project.deployUrl)) && (
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2">
            {isUrl(project.deployUrl) && (
              <a
                href={project.deployUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-link px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-link-hover"
              >
                배포 사이트
              </a>
            )}
            {isUrl(project.repoUrl) && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-link hover:underline"
              >
                저장소 보기 ›
              </a>
            )}
          </div>
        )}

        {project.highlights.length > 0 && (
          <ul className="flex max-w-2xl flex-col gap-1 pt-2 text-sm text-mute">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        {project.tech.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-2 pt-2">
            {project.tech.map((t) => (
              <li key={t} className="rounded-full bg-chip px-3 py-1 text-xs font-medium text-ink/80">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 스크린샷 — 카드 아래쪽을 크게 채움, 누르면 배포 사이트로 이동 */}
      {project.image && (
        <div className="px-6 sm:px-12">
          <a
            href={isUrl(project.deployUrl) ? project.deployUrl : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-t-2xl border border-b-0 border-hairline/60"
          >
            <Image
              src={project.image}
              alt={`${project.title} 화면`}
              width={1280}
              height={720}
              className="h-auto w-full transition-transform duration-500 hover:scale-[1.015]"
            />
          </a>
        </div>
      )}

      {/* 바로가기 — 배포 사이트의 주요 페이지로 바로 이동 (발표 데모용) */}
      {project.links.length > 0 && (
        <div className="flex flex-col items-center gap-3 border-t border-hairline/50 px-6 py-6">
          <p className="text-xs font-semibold text-mute">바로가기</p>
          <div className="flex flex-wrap justify-center gap-2">
            {project.links.map((l) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-hairline px-3.5 py-1.5 text-xs text-ink transition-colors hover:border-link hover:text-link"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
