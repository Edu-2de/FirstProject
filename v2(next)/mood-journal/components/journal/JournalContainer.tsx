"use client";

import { useState } from "react";
import type { SVGProps } from "react";
import Sidebar from "./Sidebar";
import MoodPicker from "./MoodPicker";
import MoodEditor from "./MoodEditor";

// SVG Icons defined as components for cleaner usage
const Icons = {
  Sun: (props: SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
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
  Cloud: (props: SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
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
  Bolt: (props: SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
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
  Wave: (props: SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
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

// Configuration Object (The "Brain" of the UI constants)
const MOOD_CONFIG = {
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

/**
 * JournalContainer (Formerly MoodBoard).
 * Acts as the Orchestrator/Controller for the Journal module.
 * Manages state (selectedMood) and composes the sub-components.
 */
export default function JournalContainer({
  initialEntries,
}: {
  initialEntries: {
    id: string;
    mood: string;
    content: string;
    createdAt: Date;
  }[];
}) {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f8fafc] font-sans text-slate-600 overflow-hidden relative">
      {/* Abstract Background (Frutiger Aero Aura) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-200 h-200 bg-cyan-100/30 rounded-full blur-[150px] mix-blend-multiply" />
        <div className="absolute bottom-[-20%] right-[-10%] w-175 h-175 bg-blue-100/30 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      {/* Main Glass Layout */}
      {/* Increased max-width and height for 'Bigger' feel */}
      <main className="w-full h-full md:h-[90vh] md:w-[95vw] max-w-400 bg-white/60 backdrop-blur-3xl border border-white/50 md:rounded-[40px] shadow-2xl flex flex-col md:flex-row overflow-hidden z-10 relative">
        <Sidebar
          entries={initialEntries}
          currentMood={selectedMood}
          onSelectMood={setSelectedMood}
          moodsConfig={MOOD_CONFIG}
        />

        {/* Dynamic Content Area */}
        <section className="flex-1 bg-white/30 relative flex flex-col">
          {selectedMood ? (
            <MoodEditor
              moodKey={selectedMood}
              moodConfig={MOOD_CONFIG[selectedMood as keyof typeof MOOD_CONFIG]}
            />
          ) : (
            <MoodPicker />
          )}
        </section>
      </main>
    </div>
  );
}
