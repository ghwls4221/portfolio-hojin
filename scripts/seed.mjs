// data/projects.json 내용을 DB에 다시 반영하는 스크립트입니다.
// 실행: npm run seed  (.env.local의 MONGODB_URI를 사용합니다)
// 기존 프로젝트 목록은 지우고 새로 넣습니다. 방명록은 건드리지 않습니다.
import { readFile } from "node:fs/promises";
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI가 없습니다. .env.local을 먼저 만들어주세요.");
  process.exit(1);
}

const projects = JSON.parse(
  await readFile(new URL("../data/projects.json", import.meta.url), "utf8")
);

await mongoose.connect(uri);
const collection = mongoose.connection.collection("projects");
await collection.deleteMany({});
const now = new Date();
await collection.insertMany(projects.map((p) => ({ ...p, createdAt: now, updatedAt: now })));
console.log(`프로젝트 ${projects.length}개를 반영했습니다.`);
await mongoose.disconnect();
