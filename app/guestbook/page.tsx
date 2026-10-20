import { createGuestbookAction } from "@/lib/actions";
import { getGuestbookEntries } from "@/lib/guestbook";
import { SubmitButton } from "@/components/SubmitButton";

export const dynamic = "force-dynamic";

const fieldClass =
  "w-full rounded-xl border border-hairline bg-card px-4 py-3 text-sm text-ink outline-none transition-shadow placeholder:text-mute focus:border-link focus:ring-4 focus:ring-link/15";

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
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-20">
      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-5xl font-semibold tracking-tight text-ink">방명록</h1>
        <p className="text-lg text-mute">한마디 남겨주세요. MongoDB에 저장됩니다.</p>
      </div>

      <form
        action={createGuestbookAction}
        className="flex flex-col gap-3 rounded-[28px] bg-card p-6 shadow-[0_2px_24px_rgba(0,0,0,0.06)] sm:p-8"
      >
        <input name="name" placeholder="이름 (20자 이내)" required maxLength={20} className={fieldClass} />
        <textarea
          name="message"
          placeholder="메시지 (200자 이내)"
          required
          maxLength={200}
          rows={3}
          className={`${fieldClass} resize-none`}
        />
        {error && (
          <p className="text-sm text-red-600">이름과 메시지를 길이 제한에 맞게 입력해주세요.</p>
        )}
        <div className="flex justify-end pt-1">
          <SubmitButton label="남기기" />
        </div>
      </form>

      <ul className="flex flex-col overflow-hidden rounded-[28px] bg-card shadow-[0_2px_24px_rgba(0,0,0,0.06)]">
        {entries.length === 0 && (
          <li className="px-6 py-8 text-center text-sm text-mute">
            아직 방명록이 없습니다. 첫 글을 남겨주세요!
          </li>
        )}
        {entries.map((entry) => (
          <li key={entry.id} className="flex flex-col gap-1 border-b border-hairline/50 px-6 py-5 last:border-b-0">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-semibold text-ink">{entry.name}</span>
              <span className="text-xs text-mute">{entry.createdAt}</span>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-6 text-ink/90">{entry.message}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
