// DB 조회를 기다리는 동안 자동으로 보이는 로딩 UI
export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-6 py-16">
      <div className="h-8 w-1/2 animate-pulse rounded bg-chip" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-chip" />
      <div className="h-40 w-full animate-pulse rounded-lg bg-chip" />
    </div>
  );
}
