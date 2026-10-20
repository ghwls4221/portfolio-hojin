// 태그(기술 스택)에 순서대로 돌려 쓰는 색 — 라이트/다크 모드 모두 읽히게 배경과 글자를 짝으로 지정
export const TAG_COLORS = [
  "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
  "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300",
  "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
  "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
];

export function tagColor(index: number) {
  return TAG_COLORS[index % TAG_COLORS.length];
}

// 큰 제목에 쓰는 그라데이션 글자 (파랑 → 보라 → 분홍)
export const GRADIENT_TEXT =
  "bg-linear-to-r from-blue-600 via-violet-600 to-pink-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-pink-400";
