import { createGuestbookAction } from "@/lib/actions";
import { getGuestbookEntries } from "@/lib/guestbook";
import { SubmitButton } from "@/components/SubmitButton";

export const dynamic = "force-dynamic";

// 방명록: 읽기(Server Component에서 DB 조회) + 쓰기(<form action> + Server Action)
// React는 {entry.message}를 자동으로 이스케이프하므로, 누가 <script>를 써도 실행되지 않습니다(XSS 방지).
export default async function GuestbookPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const entries = await getGuestbookEntries();

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">방명록</h1>
        <p className="text-sm text-zinc-500">한마디 남겨주세요. MongoDB에 저장됩니다.</p>
      </div>

      <form action={createGuestbookAction} className="flex flex-col gap-3">
        <input
          name="name"
          placeholder="이름 (20자 이내)"
          required
          maxLength={20}
          className="rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent"
        />
        <textarea
          name="message"
          placeholder="메시지 (200자 이내)"
          required
          maxLength={200}
          rows={3}
          className="resize-none rounded-md border border-black/[.08] px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/[.145] dark:bg-transparent"
        />
        {error && (
          <p className="text-sm text-red-600">이름과 메시지를 길이 제한에 맞게 입력해주세요.</p>
        )}
        <div>
          <SubmitButton label="남기기" />
        </div>
      </form>

      <ul className="flex flex-col divide-y divide-black/[.08] dark:divide-white/[.145]">
        {entries.length === 0 && (
          <li className="py-4 text-sm text-zinc-500">아직 방명록이 없습니다. 첫 글을 남겨주세요!</li>
        )}
        {entries.map((entry) => (
          <li key={entry.id} className="flex flex-col gap-1 py-4">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium">{entry.name}</span>
              <span className="text-xs text-zinc-500">{entry.createdAt}</span>
            </div>
            <p className="whitespace-pre-wrap text-sm text-zinc-700 dark:text-zinc-300">
              {entry.message}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
