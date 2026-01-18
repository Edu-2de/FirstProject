"use client";

import { useState } from "react";
import { Icons } from "./Icons";

type Entry = {
  id: string;
  mood: string;
  content: string;
  createdAt: Date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MOOD_ICONS: Record<string, any> = {
  happy: Icons.Sun,
  sad: Icons.Cloud,
  angry: Icons.Bolt,
  afraid: Icons.Wave,
};

const ITEMS_PER_PAGE = 3;

export default function Notebook({ entries }: { entries: Entry[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);

  const totalPages = Math.ceil(Math.max(entries.length, 1) / ITEMS_PER_PAGE);

  const currentEntries = entries.slice(
    pageIndex * ITEMS_PER_PAGE,
    (pageIndex + 1) * ITEMS_PER_PAGE,
  );

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsOpen(false);
    setPageIndex(0);
  };

  const nextPage = () => {
    if (pageIndex + 1 < totalPages) setPageIndex((prev) => prev + 1);
  };

  const prevPage = () => {
    if (pageIndex > 0) setPageIndex((prev) => prev - 1);
  };

  if (!isOpen) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-in zoom-in-95 duration-700">
        <button
          onClick={handleOpen}
          className="group relative w-90 h-130 md:w-112.5 md:h-155 perspective-1000 transition-transform duration-500 hover:-translate-y-4 hover:rotate-1"
        >
          <div className="absolute inset-0 bg-[#4A1519] rounded-r-xl rounded-l-sm shadow-[30px_40px_70px_-15px_rgba(0,0,0,0.5)] border-l-12 border-[#2E0D0F] flex flex-col items-center justify-center text-[#E5DACE]">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] mix-blend-overlay rounded-r-xl"></div>

            <div className="absolute inset-6 border-2 border-[#C5A065]/50 rounded-sm"></div>
            <div className="absolute inset-8 border border-[#C5A065]/30 rounded-sm"></div>

            <div className="text-center transform translate-x-2 relative z-10">
              <span className="block text-xs tracking-[0.6em] text-[#C5A065]/80 mb-8 uppercase font-bold">
                Confidential
              </span>
              <h1 className="font-serif text-7xl text-[#C5A065] tracking-widest drop-shadow-md mb-6 font-black">
                JOURNAL
              </h1>
              <div className="w-20 h-1 bg-[#C5A065]/60 mx-auto my-8 rounded-full"></div>
              <span className="font-mono text-xs text-[#C5A065]/60 uppercase tracking-[0.3em]">
                Vol. I
              </span>
            </div>
          </div>

          <div className="absolute top-2 bottom-2 right-0 w-8 bg-[#F5F5F5] rounded-r-md transform translate-x-7 z-[-1] shadow-xl border-r border-slate-400">
            <div className="h-full w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_1px,#d4d4d4_2px)] opacity-60"></div>
          </div>
        </button>

        <p className="mt-16 text-slate-500/80 font-serif italic text-xl animate-pulse tracking-wide">
          Tap to open archive
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-5xl flex flex-col items-center animate-in zoom-in-95 duration-500">
      <button
        onClick={handleClose}
        className="absolute -top-16 right-0 text-slate-700/60 hover:text-slate-900 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/40 px-6 py-3 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/80"
      >
        Close <span className="text-xl leading-none">×</span>
      </button>

      <div className="relative w-full bg-[#4A1519] rounded-lg shadow-2xl p-3 md:p-6 pb-4 md:pb-8 flex flex-col items-center">
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] mix-blend-overlay rounded-lg pointer-events-none"></div>

        <div className="absolute top-0 bottom-0 left-6 w-4 bg-black/20 blur-md z-0"></div>

        <div className="relative w-full bg-[#FAFAFA] min-h-225 shadow-inner rounded-r-sm rounded-l-sm overflow-hidden flex flex-col z-10">
          <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

          <div className="h-28 border-b-2 border-red-300/40 flex items-end px-12 pb-4 bg-white/40">
            <div className="w-full flex justify-between items-baseline">
              <h2 className="font-serif text-4xl text-slate-800 italic">
                Daily Entries
              </h2>
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                Page {pageIndex + 1} / {totalPages}
              </span>
            </div>
          </div>

          <div className="absolute top-0 bottom-0 left-20 md:left-28 w-0.5 bg-red-400/20 h-full z-20"></div>

          <div className="flex-1 relative py-12 px-6 md:px-16 ml-12 md:ml-20">
            <div
              className="absolute inset-0 pointer-events-none mt-12"
              style={{
                backgroundImage:
                  "linear-gradient(transparent 96%, #e2e8f0 96%)",
                backgroundSize: "100% 3rem",
              }}
            />

            <div className="relative z-30 space-y-16">
              {currentEntries.length > 0 ? (
                currentEntries.map((entry) => {
                  const Icon = MOOD_ICONS[entry.mood] || Icons.Sun;
                  return (
                    <div key={entry.id} className="relative group">
                      <div className="absolute -left-24 md:-left-32 top-2 w-20 text-right">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {new Date(entry.createdAt).toLocaleDateString(
                            undefined,
                            { month: "short" },
                          )}
                        </span>
                        <span className="block text-2xl font-serif text-slate-600 font-bold">
                          {new Date(entry.createdAt).getDate()}
                        </span>
                      </div>

                      <div className="pl-2">
                        <div className="flex items-center gap-3 mb-1 -mt-2">
                          <Icon className="w-5 h-5 text-slate-400" />
                          <span className="text-[10px] uppercase tracking-widest font-bold bg-slate-100 px-2 py-0.5 rounded text-slate-500">
                            {entry.mood}
                          </span>
                          <span className="text-[10px] text-slate-300">
                            {new Date(entry.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>

                        <p className="text-2xl md:text-3xl font-serif text-slate-800 leading-12 whitespace-pre-wrap">
                          {entry.content}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-32 opacity-30">
                  <p className="font-serif italic text-3xl text-slate-400">
                    Empty Page
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="h-24 border-t border-slate-100 mt-auto flex items-center justify-between px-10 bg-slate-50/30">
            <button
              onClick={prevPage}
              disabled={pageIndex === 0}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 disabled:opacity-20 hover:text-slate-800 transition-colors uppercase tracking-widest"
            >
              ← Previous
            </button>

            <button
              onClick={nextPage}
              disabled={pageIndex + 1 >= totalPages}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 disabled:opacity-20 hover:text-slate-800 transition-colors uppercase tracking-widest"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
