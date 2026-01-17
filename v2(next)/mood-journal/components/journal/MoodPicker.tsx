/**
 * MoodPicker View.
 * Displayed when no mood is selected.
 * Focuses on a clean, centered call-to-action to initiate the user flow.
 */
export default function MoodPicker() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-12 animate-in fade-in duration-700">
      {/* Decorative Pulse Element */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-cyan-200 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="relative w-24 h-24 rounded-full border border-slate-200 bg-white/30 flex items-center justify-center shadow-sm backdrop-blur-sm">
          <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
        </div>
      </div>

      <h2 className="text-2xl font-light text-slate-700 mb-2">
        Ready to reflect?
      </h2>
      <p className="text-slate-400 font-light tracking-wide max-w-md mx-auto">
        Select a state of mind from the sidebar to begin your daily entry.
      </p>
    </div>
  );
}
