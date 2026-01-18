import { createMoodEntry } from "@/server/mood.actions"; // Removi o Prisma pois não precisamos buscar o histórico aqui
import Link from "next/link";
import { Icons } from "@/components/journal/Icons";
import type { ComponentType, SVGProps } from "react";

const MOOD_CONFIG: Record<
  string,
  { label: string; color: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }
> = {
  happy: {
    label: "Joy",
    color: "text-amber-600 border-amber-200 bg-amber-50 selection:bg-amber-100",
    Icon: Icons.Sun,
  },
  sad: {
    label: "Reflection",
    color: "text-cyan-600 border-cyan-200 bg-cyan-50 selection:bg-cyan-100",
    Icon: Icons.Cloud,
  },
  angry: {
    label: "Power",
    color: "text-rose-600 border-rose-200 bg-rose-50 selection:bg-rose-100",
    Icon: Icons.Bolt,
  },
  afraid: {
    label: "Unknown",
    color:
      "text-indigo-600 border-indigo-200 bg-indigo-50 selection:bg-indigo-100",
    Icon: Icons.Wave,
  },
};

export default async function WritePage({
  params,
}: {
  params: { mood: string };
}) {
  const { mood } = await params;
  const config = MOOD_CONFIG[mood] || MOOD_CONFIG["happy"];

  return (
    <div
      className={`min-h-screen font-sans flex flex-col items-center justify-center relative overflow-hidden ${config.color.split(" ").pop()}`}
      style={{
        backgroundColor: "#F0E7DB",
        backgroundImage: `
          linear-gradient(#E5DACE 1px, transparent 1px),
          linear-gradient(90deg, #E5DACE 1px, transparent 1px)
        `,
        backgroundSize: "30px 30px",
      }}
    >
      <nav className="absolute top-8 left-8 z-50">
        <Link
          href="/"
          className="group flex items-center gap-3 text-sm font-bold tracking-widest text-slate-500 hover:text-slate-800 transition-colors uppercase bg-white/50 backdrop-blur-sm border border-slate-300/50 px-5 py-3 rounded-full shadow-sm hover:bg-white"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Back to Desk
        </Link>
      </nav>

      <div className="relative w-full max-w-3xl px-6 animate-in zoom-in-95 duration-700">
        <div className="bg-white relative shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-sm border border-slate-200 p-12 md:p-16 rotate-1">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-rose-100/80 -rotate-2 shadow-sm backdrop-blur-sm border-l border-r border-white/50" />

          <header className="mb-12 flex flex-col items-start border-b-2 border-slate-100 pb-8">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border bg-white ${config.color.replace("text-", "border-")}`}
            >
              <config.Icon
                className={`w-4 h-4 ${config.color.split(" ")[0]}`}
              />
              <span className="text-slate-500">New Entry</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-thin text-slate-900 tracking-tighter leading-tight">
              Focusing on <br />
              <span className="font-serif italic font-normal text-slate-800">
                {config.label}
              </span>
            </h1>
          </header>

          <form action={createMoodEntry} className="relative group">
            <input type="hidden" name="mood" value={mood} />

            <div className="relative">
              <textarea
                name="content"
                placeholder="Let your thoughts flow..."
                className="w-full bg-transparent border-none text-xl md:text-2xl font-serif text-slate-700 placeholder:text-slate-300 placeholder:font-sans focus:outline-none resize-none leading-10 min-h-75"
                style={{
                  backgroundImage:
                    "linear-gradient(transparent 95%, #E2E8F0 95%)",
                  backgroundSize: "100% 2.5rem",
                  lineHeight: "2.5rem",
                }}
                autoFocus
                required
              />
            </div>

            <div className="flex justify-between items-center pt-10 mt-4 border-t border-slate-100">
              <span className="text-xs font-mono text-slate-400">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              <button
                type="submit"
                className="
                  group relative px-8 py-3 bg-slate-900 text-white rounded-sm text-xs font-bold tracking-[0.2em] uppercase
                  shadow-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300
                "
              >
                <span className="relative z-10 flex items-center gap-3">
                  Save Memory
                  <span className="group-hover:translate-x-1 transition-transform">
                    ➔
                  </span>
                </span>
              </button>
            </div>
          </form>
        </div>

        <div className="absolute top-2 left-8 w-full h-full bg-white rounded-sm border border-slate-200 -z-10 -rotate-2 shadow-sm"></div>
      </div>
    </div>
  );
}
