"use client";

const ERAS = [
  { value: "Anything", label: "🎵 Anything Goes" },
  { value: "2020-2026", label: "🔥 2020s (Fresh Drops)" },
  { value: "2015-2020", label: "💿 2015 – 2020" },
  { value: "2010-2015", label: "📻 2010 – 2015" },
  { value: "2000-2010", label: "🎸 2000s Throwback" },
  { value: "1990-2000", label: "📼 90s Classic" },
];

interface EraSelectorProps {
  selected: string;
  onChange: (era: string) => void;
}

export default function EraSelector({ selected, onChange }: EraSelectorProps) {
  return (
    <div className="relative">
      <select
        id="era-selector"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full appearance-none
          bg-white/5 border border-white/12
          text-[#FEF3C7] text-sm font-medium
          rounded-xl px-4 py-3
          backdrop-blur-sm
          focus:outline-none focus:ring-2 focus:ring-[#D97706]/50 focus:border-[#D97706]/40
          transition-all duration-200
          cursor-pointer
        "
      >
        {ERAS.map((era) => (
          <option key={era.value} value={era.value} className="bg-[#1C1009] text-[#FEF3C7]">
            {era.label}
          </option>
        ))}
      </select>
      {/* Chevron icon */}
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
        <svg className="w-4 h-4 text-[#A8956A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
