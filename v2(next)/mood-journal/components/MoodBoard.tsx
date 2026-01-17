"use client";

import { useState } from "react";
import { createMoodEntry } from "@/server/mood.actions";

// Ícones SVG minimalistas (Traço fino e elegante)
const Icons = {
  Sun: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  ),
  Cloud: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      />
    </svg>
  ),
  Bolt: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  ),
  Wave: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  ),
};

// Configuração refinada (Cores suaves e ícones)
const MOODS = {
  happy: {
    label: "Clarity",
    icon: Icons.Sun,
    color: "text-amber-600",
    bgActive: "bg-amber-50 border-amber-200",
  },
  sad: {
    label: "Melancholy",
    icon: Icons.Cloud,
    color: "text-cyan-600",
    bgActive: "bg-cyan-50 border-cyan-200",
  },
  angry: {
    label: "Energy",
    icon: Icons.Bolt,
    color: "text-rose-600",
    bgActive: "bg-rose-50 border-rose-200",
  },
  afraid: {
    label: "Haze",
    icon: Icons.Wave,
    color: "text-indigo-600",
    bgActive: "bg-indigo-50 border-indigo-200",
  },
};

type Entry = {
  id: string;
  mood: string;
  content: string;
  createdAt: Date;
};

export default function MoodBoard({
  initialEntries,
}: {
  initialEntries: Entry[];
}) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f8fafc] text-slate-600 p-8 font-sans selection:bg-cyan-100">
      {/* Background Sutil (Aura Frutiger) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[15%] w-150 h-150 bg-cyan-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-70" />
        <div className="absolute bottom-[10%] right-[15%] w-125 h-125 bg-blue-100/40 rounded-full blur-[100px] mix-blend-multiply opacity-70" />
      </div>

      {/* Main Glass Panel - Mais largo (max-w-6xl) para não ficar apertado */}
      <div className="w-full max-w-6xl min-h-175 bg-white/70 backdrop-blur-3xl border border-white/60 rounded-4xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] relative z-10 flex flex-col md:flex-row overflow-hidden">
        {/* SIDEBAR (Menu) */}
        <aside className="w-full md:w-80 bg-white/40 border-r border-white/50 p-10 flex flex-col gap-10">
          <div>
            <h1 className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-400 mb-1">
              Journal
            </h1>
            <p className="text-2xl font-light text-slate-800 tracking-tight">
              Daily <span className="font-normal text-cyan-600">Flow</span>
            </p>
          </div>

          <nav className="flex flex-col gap-3">
            {Object.entries(MOODS).map(([key, value]) => {
              const Icon = value.icon;
              const isActive = selectedMood === key;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedMood(key)}
                  className={`
                    group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-500 ease-out border
                    ${
                      isActive
                        ? `${value.bgActive} shadow-sm translate-x-2`
                        : "bg-transparent border-transparent hover:bg-white/60 hover:border-white/60"
                    }
                  `}
                >
                  <div
                    className={`transition-colors duration-300 ${isActive ? value.color : "text-slate-400 group-hover:text-slate-600"}`}
                  >
                    <Icon />
                  </div>
                  <span
                    className={`text-sm font-medium tracking-wide transition-colors ${isActive ? "text-slate-700" : "text-slate-500"}`}
                  >
                    {value.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Histórico Simplificado (Minimalista) */}
          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-4 opacity-40">
              <div className="h-px flex-1 bg-slate-300"></div>
              <span className="text-[10px] uppercase tracking-widest">
                History
              </span>
              <div className="h-pxflex-1 bg-slate-300"></div>
            </div>

            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
              {initialEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="group text-xs py-2 border-b border-slate-100 last:border-0 hover:pl-1 transition-all"
                >
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span className="font-medium group-hover:text-cyan-600 transition-colors">
                      {new Date(entry.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-slate-500 line-clamp-1 opacity-70 group-hover:opacity-100">
                    {entry.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ÁREA DE CONTEÚDO (Espaçosa) */}
        <main className="flex-1 relative bg-white/20 p-12 md:p-20 flex flex-col">
          {!selectedMood ? (
            // Estado Vazio (Centralizado e Limpo)
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-40 select-none">
              <div className="w-24 h-24 mb-6 rounded-full border border-slate-300 flex items-center justify-center">
                <div className="w-2 h-2 bg-slate-300 rounded-full animate-pulse"></div>
              </div>
              <p className="text-lg font-light tracking-wide text-slate-500">
                Select a state of mind to focus
              </p>
            </div>
          ) : (
            // Formulário de Escrita
            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
              <header className="mb-12">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 ${MOODS[selectedMood as keyof typeof MOODS].color} bg-white/50 border border-white`}
                >
                  <span>Current State</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight">
                  {MOODS[selectedMood as keyof typeof MOODS].label}
                </h2>
              </header>

              <form action={createMoodEntry} className="flex-1 flex flex-col">
                <input type="hidden" name="mood" value={selectedMood} />

                <textarea
                  name="content"
                  placeholder="What is flowing through your mind right now?"
                  className="
                    flex-1 w-full bg-transparent border-none outline-none
                    text-xl md:text-2xl font-light text-slate-600 placeholder:text-slate-300/80
                    resize-none leading-relaxed p-0 focus:ring-0
                  "
                  autoFocus
                  required
                />

                <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-200/50">
                  <span className="text-xs text-slate-400 font-medium tracking-wider">
                    {new Date().toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                  <button
                    type="submit"
                    className="
                      px-10 py-4 rounded-full bg-slate-900 text-white text-sm font-medium tracking-wide
                      shadow-xl shadow-slate-200/50
                      hover:bg-slate-800 hover:scale-[1.02] hover:shadow-2xl
                      active:scale-95 transition-all duration-300
                    "
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
