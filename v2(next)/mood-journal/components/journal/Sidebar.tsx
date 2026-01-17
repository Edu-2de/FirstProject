
/**
 * Interface for the Mood definition used across the UI.
 * Keeping UI constants decoupled from logic is a best practice.
 */
interface MoodConfig {
  label: string;
  icon: React.ElementType;
  color: string;
  bgActive: string;
}

interface SidebarProps {
  entries: { id: string; mood: string; content: string; createdAt: Date }[];
  currentMood: string | null;
  onSelectMood: (mood: string) => void;
  moodsConfig: Record<string, MoodConfig>;
}

/**
 * Sidebar Component.
 * Handles navigation and displays recent historical entries.
 * Designed to be responsive: collapsible on mobile, fixed on desktop.
 */
export default function Sidebar({
  entries,
  currentMood,
  onSelectMood,
  moodsConfig,
}: SidebarProps) {
  return (
    <aside className="w-full md:w-80 bg-white/50 border-r border-white/40 p-8 flex flex-col gap-8 backdrop-blur-md">
      {/* Brand Header */}
      <div>
        <h1 className="text-xs font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">
          My Journal
        </h1>
        <p className="text-3xl font-light text-slate-800 tracking-tighter">
          Mind<span className="font-medium text-cyan-600">Flow</span>
        </p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2">
        {Object.entries(moodsConfig).map(([key, value]) => {
          const Icon = value.icon;
          const isActive = currentMood === key;

          return (
            <button
              key={key}
              onClick={() => onSelectMood(key)}
              className={`
                group flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 border border-transparent
                ${
                  isActive
                    ? `${value.bgActive} shadow-sm translate-x-1`
                    : "hover:bg-white/60 hover:border-white/50"
                }
              `}
              aria-label={`Select mood: ${value.label}`}
            >
              <div
                className={`transition-colors duration-300 ${isActive ? value.color : "text-slate-400 group-hover:text-slate-600"}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span
                className={`text-sm font-medium tracking-wide ${isActive ? "text-slate-700" : "text-slate-500"}`}
              >
                {value.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* History Section (Recent Entries) */}
      <div className="mt-auto pt-6 border-t border-slate-200/60">
        <h3 className="text-[10px] uppercase tracking-widest text-slate-400 mb-4 font-semibold">
          Recent History
        </h3>

        <div className="space-y-3 max-h-75 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
          {entries.map((entry) => (
            <div key={entry.id} className="group cursor-default">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-medium text-slate-400 group-hover:text-cyan-600 transition-colors">
                  {new Date(entry.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                {entry.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
