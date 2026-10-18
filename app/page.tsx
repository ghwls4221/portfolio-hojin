import { ProjectCard } from "@/components/ProjectCard";
import { profile } from "@/data/profile";
import { getProjects, type ProjectCategory } from "@/lib/projects";

// 요청마다 DB에서 최신 목록을 읽도록 동적 렌더링으로 지정합니다.
// (빌드 시점에 DB에 접속하지 않으므로 Vercel 빌드도 안전합니다.)
export const dynamic = "force-dynamic";

const SECTIONS: { category: ProjectCategory; title: string }[] = [
  { category: "course", title: "수업 실습 프로젝트" },
  { category: "team", title: "팀 프로젝트" },
  { category: "personal", title: "개인 프로젝트" },
];

// Server Component — useEffect/fetch 없이 await로 DB를 바로 조회합니다.
export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-14 px-6 py-16">
      <section className="flex flex-col gap-4">
        <p className="text-sm text-zinc-500">{profile.school}</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          안녕하세요, {profile.name}입니다.
        </h1>
        <p className="max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">{profile.intro}</p>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {profile.skills.map((s) => (
            <span
              key={s}
              className="rounded-md border border-black/[.08] px-2.5 py-1 text-xs dark:border-white/[.145]"
            >
              {s}
            </span>
          ))}
        </div>
        {profile.email && (
          <p className="text-sm text-zinc-500">
            연락처:{" "}
            <a href={`mailto:${profile.email}`} className="underline">
              {profile.email}
            </a>
          </p>
        )}
      </section>

      <section id="projects" className="flex scroll-mt-8 flex-col gap-10">
        {SECTIONS.map(({ category, title }) => {
          const items = projects.filter((p) => p.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category} className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold">{title}</h2>
              {items.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          );
        })}
      </section>
    </main>
  );
}
