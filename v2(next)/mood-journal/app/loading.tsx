export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F0E7DB] flex flex-col items-center justify-center z-50">
      <div className="relative animate-bounce-slow">
        <div className="w-48 h-60 bg-white p-3 pb-8 shadow-2xl -rotate-3 rounded-sm border border-slate-200">
          <div className="w-full h-full bg-slate-100 overflow-hidden relative">
            <div className="absolute inset-0 bg-slate-200 animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center opacity-50">
              <span className="text-4xl">📸</span>
            </div>
          </div>
          <div className="mt-4 h-2 w-20 bg-slate-100 rounded mx-auto animate-pulse" />
        </div>

        <div className="absolute -bottom-10 left-4 w-40 h-4 bg-black/10 blur-xl rounded-[100%]"></div>
      </div>

      <p className="mt-8 font-serif italic text-slate-500 animate-pulse tracking-widest">
        Developing memories...
      </p>
    </div>
  );
}
