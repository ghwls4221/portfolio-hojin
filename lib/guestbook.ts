import { connectDB } from "./mongodb";
import { GuestbookEntry as GuestbookModel } from "@/models/GuestbookEntry";

export type GuestbookEntry = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

type GuestbookDocLike = {
  _id: unknown;
  name: string;
  message: string;
  createdAt?: Date;
};

function toEntry(doc: GuestbookDocLike): GuestbookEntry {
  return {
    id: String(doc._id),
    name: doc.name,
    message: doc.message,
    createdAt: (doc.createdAt ?? new Date()).toISOString().slice(0, 10),
  };
}

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  await connectDB();
  // 최신 50개만 가져옵니다 — 글이 많아져도 페이지가 무거워지지 않게.
  const docs = await GuestbookModel.find().sort({ createdAt: -1 }).limit(50).lean();
  return docs.map((doc) => toEntry(doc as unknown as GuestbookDocLike));
}

export async function createGuestbookEntry(input: { name: string; message: string }) {
  await connectDB();
  const doc = await GuestbookModel.create(input);
  return toEntry(doc);
}
