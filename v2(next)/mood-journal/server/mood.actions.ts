"use server"; // 👈 This marks the file as Server-Side only

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// This function will be called when the user submits the form
export async function createMoodEntry(formData: FormData) {
  // 1. Extract data from the HTML form
  const mood = formData.get("mood") as string;
  const content = formData.get("content") as string;

  // 2. Basic validation (Senior Tip: Always validate inputs!)
  if (!mood || !content) {
    throw new Error("Mood and content are required");
  }

  // 3. Save to Database using Prisma
  await prisma.moodEntry.create({
    data: {
      mood, // e.g., 'happy'
      content, // e.g., 'Today was a good day...'
    },
  });

  // 4. Update the UI
  // This tells Next.js: "Data changed, refresh the page to show new entries"
  revalidatePath("/");
}
