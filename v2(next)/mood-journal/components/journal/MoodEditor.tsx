import { createMoodEntry } from "@/server/mood.actions";

interface MoodEditorProps {
  moodKey: string;
  moodConfig: {
    label: string;
    color: string;
  };
}

/**
 * MoodEditor Component.
 * Handles the actual content creation.
 * Uses Next.js Server Actions for form submission.
 */
export default function MoodEditor({ moodKey, moodConfig }: MoodEditorProps) {
  return (
    <div className="flex-1 flex flex-col h-full p-12 md:p-20 animate-in slide-in-from-bottom-4 fade-in duration-500">
      <header className="mb-12">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 ${moodConfig.color} bg-white/80 border border-white/50 shadow-sm`}
        >
          <span>Current Mood</span>
        </div>
        <h2 className="text-5xl md:text-6xl font-light text-slate-800 tracking-tight">
          {moodConfig.label}
        </h2>
      </header>

      {/* We use a standard HTML form triggering a Server Action.
        In a larger app, we might use 'useFormState' hook for loading states.
      */}
      <form action={createMoodEntry} className="flex-1 flex flex-col">
        <input type="hidden" name="mood" value={moodKey} />

        <textarea
          name="content"
          placeholder="What are your thoughts right now?"
          className="
            flex-1 w-full bg-transparent border-none outline-none
            text-xl md:text-2xl font-light text-slate-600 placeholder:text-slate-300
            resize-none leading-relaxed p-0 focus:ring-0
          "
          autoFocus
          required
        />

        <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-200/60">
          <span className="text-xs text-slate-400 font-medium tracking-wider">
            {new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          <button
            type="submit"
            className="
              px-8 py-3 rounded-full bg-slate-900 text-white text-sm font-medium tracking-wide
              shadow-lg shadow-slate-300/50
              hover:bg-slate-800 hover:scale-[1.02] hover:shadow-xl
              active:scale-95 transition-all duration-300
            "
          >
            Save Entry ➔
          </button>
        </div>
      </form>
    </div>
  );
}
