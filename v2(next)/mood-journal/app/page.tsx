import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/journal/Icons";

type MoodItem = {
  type: "mood";
  key: string;
  label: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  customClass: string;
  imageUrl: string;
};

type StickerItem = {
  type: "sticker";
  text: string;
  customClass: string;
  color: string;
};

type SealItem = {
  type: "seal";
  label: string;
  link: string;
  customClass: string;
};

const SCRAPBOOK_ITEMS: (MoodItem | StickerItem | SealItem)[] = [
  {
    type: "seal",
    label: "OPEN ARCHIVE",
    link: "/notebook",
    customClass: "absolute -top-80 right-[15%] md:right-[18%] z-90 rotate-12",
  },

  {
    type: "mood",
    key: "happy",
    label: "Joy",
    description: "Lightness.",
    Icon: Icons.Sun,
    customClass:
      "rotate-[-3deg] hover:rotate-0 hover:scale-110 hover:z-40 z-10",
    imageUrl: "/moods/happy.jpg",
  },
  {
    type: "mood",
    key: "sad",
    label: "Reflection",
    description: "Processing.",
    Icon: Icons.Cloud,
    customClass:
      "rotate-[2deg] -ml-16 mt-8 hover:rotate-0 hover:scale-110 hover:z-40 z-20",
    imageUrl: "/moods/sad.jpg",
  },
  {
    type: "mood",
    key: "angry",
    label: "Power",
    description: "Raw energy.",
    Icon: Icons.Bolt,
    customClass:
      "rotate-[-4deg] -ml-16 translate-y-6 hover:rotate-0 hover:scale-110 hover:z-40 z-30",
    imageUrl: "/moods/angry.jpg",
  },

  {
    type: "sticker",
    text: "Energy cannot be destroyed.",
    color: "bg-rose-100",
    customClass: "rotate-[-6deg] -ml-12 -mt-24 z-50 w-36 h-36 shadow-md",
  },

  {
    type: "mood",
    key: "afraid",
    label: "Unknown",
    description: "Exploring.",
    Icon: Icons.Wave,
    customClass:
      "rotate-[3deg] -ml-20 -mt-4 hover:rotate-0 hover:scale-110 hover:z-40 z-10",
    imageUrl: "/moods/afraid.jpg",
  },
];

export default async function Home() {
  return (
    <div
      className="min-h-screen text-slate-600 font-sans overflow-x-hidden selection:bg-rose-200 selection:text-rose-900"
      style={{
        backgroundColor: "#F0E7DB",
        backgroundImage: `
          linear-gradient(#E5DACE 1px, transparent 1px),
          linear-gradient(90deg, #E5DACE 1px, transparent 1px)
        `,
        backgroundSize: "30px 30px",
      }}
    >
      <header className="sticky top-0 z-60 bg-[#F0E7DB]/80 backdrop-blur-sm border-b border-slate-300/50 px-8 py-6 flex justify-between items-center">
        <div>
          <p className="text-sm font-bold tracking-widest uppercase text-slate-500 font-serif">
            Mind<span className="text-slate-800">Flow</span>
          </p>
        </div>
        <div className="font-mono text-xs text-slate-600 border border-slate-400/30 px-3 py-1 rounded-sm bg-[#F8F4F0]">
          {new Date()
            .toLocaleDateString("en-US", {
              weekday: "short",
              day: "2-digit",
              month: "short",
            })
            .toUpperCase()}
        </div>
      </header>

      <main className="min-h-screen flex flex-col items-center justify-center pb-32 pt-10 relative">
        <div className="mb-10 text-center max-w-3xl px-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-6xl md:text-8xl font-thin text-slate-900 tracking-tighter mb-4 leading-[0.9] drop-shadow-sm">
            Current <br />
            <span className="font-serif italic font-normal text-slate-700">
              State of Mind
            </span>
          </h1>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-4xl px-4 md:gap-0 gap-12 perspective-1000 mt-10">
          {SCRAPBOOK_ITEMS.map((item, index) => {
            if (item.type === "seal") {
              return (
                <Link
                  href={item.link}
                  key={`seal-${index}`}
                  className={`group ${item.customClass}`}
                >
                  <div className="relative w-36 h-36 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-12">
                    <div className="absolute inset-0 bg-red-900 rounded-full shadow-2xl shadow-red-900/30 border-[6px] border-red-800/80"></div>

                    <div className="absolute inset-3 border-2 border-red-950/20 rounded-full border-dashed opacity-70"></div>

                    <div className="relative z-10 text-center flex flex-col items-center justify-center h-full pb-1">
                      <span className="text-[0.65rem] font-bold tracking-[0.2em] text-red-200 uppercase opacity-90 mb-1">
                        Private
                      </span>
                      <span className="font-serif font-black text-red-50 text-xl tracking-widest drop-shadow-md border-t border-b border-red-400/30 py-1 my-1">
                        ARCHIVE
                      </span>
                      <span className="text-[0.5rem] mt-1 text-red-300 opacity-70 uppercase tracking-widest">
                        Est. 2024
                      </span>
                    </div>

                    <div className="absolute top-6 left-6 w-12 h-6 bg-linear-to-br from-white/20 to-transparent rounded-full rotate-45 blur-[1px]"></div>
                  </div>
                </Link>
              );
            }

            if (item.type === "sticker") {
              return (
                <div
                  key={`sticker-${index}`}
                  className={`
                    shrink-0 p-4 flex items-center justify-center text-center
                    font-serif italic text-slate-700 text-sm leading-tight
                    ${item.color} ${item.customClass}
                    hover:scale-110 transition-transform duration-300 cursor-default
                    border border-black/5
                  `}
                >
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-white/40 rotate-1 shadow-sm backdrop-blur-sm"></div>
                  &quot;{item.text}&quot;
                </div>
              );
            }

            return (
              <Link
                key={item.key}
                href={`/write/${item.key}`}
                className={`
                  group relative flex flex-col
                  w-72 md:w-80 h-auto shrink-0
                  bg-white p-3 pb-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]
                  transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                  border border-white
                  ${item.customClass}
                `}
                style={{ transformOrigin: "center center" }}
              >
                <div className="relative w-full aspect-4/5 overflow-hidden bg-slate-200 mb-4 shadow-inner filter sepia-[0.3] contrast-[0.9] group-hover:sepia-0 group-hover:contrast-100 transition-all duration-700">
                  <Image
                    src={item.imageUrl}
                    alt={item.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-yellow-500/10 mix-blend-multiply pointer-events-none" />
                  <div className="absolute top-3 right-3 text-white drop-shadow-md opacity-70 group-hover:opacity-100 transition-all">
                    <item.Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="px-2 text-center">
                  <h3 className="text-3xl font-serif text-slate-800 mb-1 group-hover:text-black tracking-tight">
                    {item.label}
                  </h3>
                  <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-slate-400 group-hover:text-slate-600">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
