import { prisma } from "@/lib/db";
import Link from "next/link";
import Notebook from "@/components/journal/Notebook";

export default async function NotebookPage() {
  const entries = await prisma.moodEntry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div
      className="min-h-screen font-sans text-slate-700 selection:bg-amber-200 flex flex-col"
      style={{
        backgroundColor: "#D6C0A6",
        backgroundImage: `url("https://www.transparenttextures.com/patterns/wood-pattern.png")`,
        backgroundBlendMode: "multiply",
      }}
    >
      <nav className="absolute top-8 left-8 z-50">
        <Link
          href="/"
          className="group flex items-center gap-3 text-xs font-bold tracking-widest text-slate-800/60 hover:text-slate-900 transition-colors uppercase bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Desk
        </Link>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-start pt-12 md:pt-20 pb-20 px-4 md:px-8 overflow-y-auto">
        <Notebook entries={entries} />
      </main>
    </div>
  );
}
