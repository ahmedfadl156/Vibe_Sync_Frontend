"use client";

const ALL_GENRES = [
  "Rap", "Hip-Hop", "Pop", "Indie", "Alternative", "R&B", "Electronic", "Rock", "Jazz", "Soul",
];

interface GenreSelectorProps {
  selected: string[];
  onChange: (genres: string[]) => void;
  max?: number;
}

export default function GenreSelector({ selected, onChange, max = 3 }: GenreSelectorProps) {
  const toggle = (genre: string) => {
    if (selected.includes(genre)) {
      onChange(selected.filter((g) => g !== genre));
    } else if (selected.length < max) {
      onChange([...selected, genre]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {ALL_GENRES.map((genre) => {
          const active = selected.includes(genre);
          const maxed = !active && selected.length >= max;
          return (
            <button
              key={genre}
              type="button"
              onClick={() => toggle(genre)}
              disabled={maxed}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium
                border transition-all duration-150
                ${active
                  ? "bg-[#D97706]/20 border-[#D97706]/60 text-[#FEF3C7] shadow-[0_0_10px_rgba(217,119,6,0.25)]"
                  : maxed
                  ? "border-white/8 text-[#A8956A]/40 cursor-not-allowed"
                  : "border-white/12 text-[#A8956A] hover:border-[#D97706]/40 hover:text-[#FEF3C7] hover:bg-white/5"
                }
              `}
            >
              {genre}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-[#A8956A]/70">
        {selected.length}/{max} selected
      </p>
    </div>
  );
}
