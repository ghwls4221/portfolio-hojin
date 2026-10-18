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
