import Image from "next/image";
import { Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/lib/projects";

// 아직 채우지 않은 "TODO_..." 주소는 링크 버튼을 숨깁니다.
function isUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://");
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col gap-3 rounded-lg border border-black/[.08] p-5 dark:border-white/[.145]">
      {/* 스크린샷 — 누르면 배포 사이트로 이동 */}
      {project.image && (
        <a
          href={isUrl(project.deployUrl) ? project.deployUrl : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden rounded-md border border-black/[.08] dark:border-white/[.145]"
        >
          <Image
            src={project.image}
            alt={`${project.title} 화면`}
            width={1280}
            height={720}
            className="h-auto w-full transition-transform duration-300 hover:scale-[1.02]"
          />
        </a>
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        {project.period && <span className="text-xs text-zinc-500">{project.period}</span>}
      </div>
      <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">{project.summary}</p>

      {project.highlights.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}

      {project.tech.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* 바로가기 — 배포 사이트의 주요 페이지로 바로 이동 (발표 데모용) */}
      {project.links.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-zinc-500">바로가기</p>
          <div className="flex flex-wrap gap-1.5">
            {project.links.map((l) => (
              <Button key={l.url} asChild variant="ghost" size="sm" className="border border-black/[.08] dark:border-white/[.145]">
                <a href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              </Button>
            ))}
          </div>
        </div>
      )}

      {(isUrl(project.repoUrl) || isUrl(project.deployUrl)) && (
        <div className="flex flex-wrap gap-2 pt-1">
          {isUrl(project.repoUrl) && (
            <Button asChild variant="outline" size="sm">
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                <Code className="size-4" /> 저장소
              </a>
            </Button>
          )}
          {isUrl(project.deployUrl) && (
            <Button asChild size="sm">
              <a href={project.deployUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-4" /> 배포 사이트
              </a>
            </Button>
          )}
        </div>
      )}
    </article>
  );
}
