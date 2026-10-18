"use server";
// Server Action — <form action={...}>에 바로 연결해서 서버에서 실행됩니다.

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createGuestbookEntry } from "@/lib/guestbook";

export async function createGuestbookAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // 브라우저의 required/maxLength는 우회할 수 있으므로 서버에서 다시 검증합니다.
  if (!name || !message || name.length > 20 || message.length > 200) {
    redirect("/guestbook?error=1");
  }

  await createGuestbookEntry({ name, message });
  revalidatePath("/guestbook");
  redirect("/guestbook");
}
