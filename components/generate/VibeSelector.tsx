"use client";

const VIBES = [
  {
    id: "Late Night Deep",
    emoji: "🌙",
    label: "Late Night Deep",
    desc: "Dark, moody beats for the witching hour",
    color: "from-indigo-900/60 to-purple-900/60",
    glow: "shadow-[0_0_20px_rgba(99,102,241,0.3)]",
    ring: "ring-indigo-500/60",
  },
  {
    id: "Chill Session",
    emoji: "🌊",
    label: "Chill Session",
    desc: "Smooth, laid-back grooves to unwind",
    color: "from-cyan-900/60 to-teal-900/60",
    glow: "shadow-[0_0_20px_rgba(6,182,212,0.3)]",
    ring: "ring-cyan-500/60",
  },
  {
    id: "Party Mode",
    emoji: "🔥",
    label: "Party Mode",
    desc: "High-energy bangers to light up the room",
    color: "from-orange-900/60 to-red-900/60",
    glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]",
    ring: "ring-orange-500/60",
  },
  {
    id: "Beast Mode",
    emoji: "⚡",
    label: "Beast Mode",
    desc: "Pumping power anthems for your workout",
    color: "from-yellow-900/60 to-amber-900/60",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]",
    ring: "ring-yellow-500/60",
  },
  {
    id: "Heartbreak Hour",
    emoji: "💔",
    label: "Heartbreak Hour",
    desc: "Emotional deep cuts that understand you",
    color: "from-rose-900/60 to-pink-900/60",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.3)]",
    ring: "ring-rose-500/60",
  },
  {
    id: "Road Trip",
    emoji: "🚗",
    label: "Road Trip",
    desc: "Windows down, volume up, miles ahead",
    color: "from-emerald-900/60 to-green-900/60",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]",
    ring: "ring-emerald-500/60",
  },
];

interface VibeSelectorProps {
  selected: string;
  onChange: (vibe: string) => void;
}

export default function VibeSelector({ selected, onChange }: VibeSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {VIBES.map((vibe) => {
        const active = selected === vibe.id;
        return (
          <button
            key={vibe.id}
            type="button"
            onClick={() => onChange(vibe.id)}
            className={`
              relative flex flex-col items-start gap-1 p-4 rounded-2xl border text-left
              bg-linear-to-br ${vibe.color}
              backdrop-blur-sm
              transition-all duration-200
              ${active
                ? `ring-2 ${vibe.ring} border-white/20 ${vibe.glow} scale-[1.02]`
                : "border-white/8 hover:border-white/15 hover:scale-[1.01]"
              }
            `}
          >
            <span className="text-2xl leading-none">{vibe.emoji}</span>
            <span className="text-sm font-semibold text-[#FEF3C7] leading-tight mt-1">{vibe.label}</span>
            <span className="text-xs text-[#A8956A] leading-snug">{vibe.desc}</span>
            {active && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D97706] shadow-[0_0_6px_#D97706]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
