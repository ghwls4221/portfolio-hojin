"use client";
// DB 연결 실패 등 에러가 나면 내부 정보(접속 주소, 스택 트레이스) 대신 안전한 문구만 보여줍니다.
// error.tsx는 항상 Client Component여야 합니다.
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="text-lg font-medium">데이터를 불러오지 못했습니다.</p>
      <p className="max-w-sm text-sm text-zinc-500">
        일시적인 서버/DB 연결 문제일 수 있습니다. 잠시 후 다시 시도해주세요.
        {error.digest && ` (참고번호: ${error.digest})`}
      </p>
      <button
        onClick={() => reset()}
        className="rounded-md border border-black/[.08] px-4 py-2 text-sm hover:bg-black/[.03] dark:border-white/[.145] dark:hover:bg-white/[.05]"
      >
        다시 시도
      </button>
    </div>
  );
}
