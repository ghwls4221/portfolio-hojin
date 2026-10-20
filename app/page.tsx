import { ProjectCard } from "@/components/ProjectCard";
import { profile } from "@/data/profile";
import { getProjects, type ProjectCategory } from "@/lib/projects";
import { GRADIENT_TEXT, tagColor } from "@/lib/colors";

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
      <section className="relative overflow-hidden bg-card px-6 pb-20 pt-24 text-center sm:pt-28">
        {/* 히어로 뒤의 은은한 컬러 빛 (장식) */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-[110%] rounded-full bg-blue-400/25 blur-3xl dark:bg-blue-500/20" />
          <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-500/20" />
          <div className="absolute -top-32 left-1/2 h-96 w-96 translate-x-[10%] rounded-full bg-pink-400/25 blur-3xl dark:bg-pink-500/20" />
        </div>
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-5">
          <p className="text-base font-semibold text-violet-600 dark:text-violet-400">{profile.school}</p>
          <h1 className="text-balance text-5xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            안녕하세요,
            <br />
            <span className={GRADIENT_TEXT}>{profile.name}</span>입니다.
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
            {profile.skills.map((s, i) => (
              <li key={s} className={`rounded-full px-3.5 py-1.5 text-xs font-semibold ${tagColor(i)}`}>
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
                <h2 className={`text-center text-4xl font-semibold tracking-tight sm:text-5xl ${GRADIENT_TEXT}`}>
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
