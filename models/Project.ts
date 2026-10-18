import { Schema, model, models } from "mongoose";

// 포트폴리오에 보여줄 프로젝트 하나를 나타내는 스키마입니다.
// category로 "수업 실습 / 팀 프로젝트 / 개인 프로젝트"를 구분해 화면에서 섹션을 나눕니다.
const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["course", "team", "personal"],
    },
    period: { type: String, default: "" }, // 예: "3~7주차"
    highlights: { type: [String], default: [] }, // 구현한 기능 목록
    tech: { type: [String], default: [] },
    repoUrl: { type: String, default: "" },
    deployUrl: { type: String, default: "" },
    order: { type: Number, default: 0 }, // 작은 숫자가 먼저 보입니다
  },
  { timestamps: true }
);

// hot-reload 시 모델 중복 정의 에러를 막기 위해 이미 있으면 재사용합니다.
export const Project = models.Project || model("Project", projectSchema);
