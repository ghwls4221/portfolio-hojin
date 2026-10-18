import { Schema, model, models } from "mongoose";

// 방명록 한 줄. 방문자가 직접 쓰는 데이터라 길이 제한을 스키마에도 걸어둡니다
// (Server Action에서 한 번, DB 스키마에서 한 번 — 이중 검증).
const guestbookSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 20 },
    message: { type: String, required: true, trim: true, maxlength: 200 },
  },
  { timestamps: true }
);

export const GuestbookEntry =
  models.GuestbookEntry || model("GuestbookEntry", guestbookSchema);
