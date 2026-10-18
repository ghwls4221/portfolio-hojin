import { connectDB } from "./mongodb";
import { Project as ProjectModel } from "@/models/Project";
import seedData from "@/data/projects.json";

export type ProjectCategory = "course" | "team" | "personal";

export type Project = {
  id: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  period: string;
  highlights: string[];
  tech: string[];
  repoUrl: string;
  deployUrl: string;
};

type ProjectDocLike = Omit<Project, "id"> & { _id: unknown };

function toProject(doc: ProjectDocLike): Project {
  return {
    id: String(doc._id),
    title: doc.title,
    summary: doc.summary,
    category: doc.category,
    period: doc.period ?? "",
    highlights: doc.highlights ?? [],
    tech: doc.tech ?? [],
    repoUrl: doc.repoUrl ?? "",
    deployUrl: doc.deployUrl ?? "",
  };
}

// 컬렉션이 비어 있을 때만 data/projects.json 내용을 넣습니다.
// 내용을 고친 뒤 DB에 다시 반영하려면 `npm run seed`를 실행하세요.
async function seedIfEmpty() {
  const count = await ProjectModel.countDocuments();
  if (count > 0) return;
  await ProjectModel.insertMany(seedData);
}

export async function getProjects(): Promise<Project[]> {
  await connectDB();
  await seedIfEmpty();
  const docs = await ProjectModel.find().sort({ order: 1 }).lean();
  return docs.map((doc) => toProject(doc as unknown as ProjectDocLike));
}
