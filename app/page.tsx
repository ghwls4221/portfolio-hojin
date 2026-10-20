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
    <main className="flex w-full flex-col">
      {/* 히어로 — 가운데 정렬, 큰 제목, 넓은 여백 */}
      <section className="bg-card px-6 pb-20 pt-24 text-center sm:pt-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5">
          <p className="text-base font-semibold text-mute">{profile.school}</p>
          <h1 className="text-balance text-5xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            안녕하세요,
            <br />
            {profile.name}입니다.
          </h1>
          <p className="max-w-2xl text-balance text-lg leading-8 text-mute sm:text-xl">
            {profile.intro}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 pt-1 text-lg">
            <a href="#projects" className="text-link hover:underline">
              프로젝트 보기 ›
            </a>
            {profile.githubUrl.startsWith("http") && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link hover:underline"
              >
                GitHub ›
              </a>
            )}
          </div>
          <ul className="flex flex-wrap justify-center gap-2 pt-6">
            {profile.skills.map((s) => (
              <li key={s} className="rounded-full bg-chip px-3.5 py-1.5 text-xs font-medium text-ink/80">
                {s}
              </li>
            ))}
          </ul>
          {profile.email && (
            <p className="text-sm text-mute">
              연락처:{" "}
              <a href={`mailto:${profile.email}`} className="text-link hover:underline">
                {profile.email}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* 프로젝트 — 연회색 바탕 위에 큰 둥근 카드 */}
      <section id="projects" className="scroll-mt-12 px-6 py-20">
        <div className="mx-auto flex max-w-5xl flex-col gap-20">
          {SECTIONS.map(({ category, title }) => {
            const items = projects.filter((p) => p.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category} className="flex flex-col gap-8">
                <h2 className="text-center text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                  {title}
                </h2>
                {items.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
