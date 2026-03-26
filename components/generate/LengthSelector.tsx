"use client";

interface LengthSelectorProps {
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function LengthSelector({
  value,
  onChange,
  min = 1,
  max = 50,
  step = 5,
}: LengthSelectorProps) {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <div className="flex items-center justify-between bg-white/5 border border-white/12 rounded-xl px-4 py-3">
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className="
          w-9 h-9 rounded-lg flex items-center justify-center
          bg-white/8 border border-white/10
          text-[#A8956A] hover:text-[#FEF3C7] hover:bg-white/12
          active:scale-90 transition-all duration-150
          disabled:opacity-30 disabled:cursor-not-allowed
        "
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
        </svg>
      </button>

      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold text-[#D97706] tabular-nums leading-none">{value}</span>
        <span className="text-xs text-[#A8956A] mt-0.5">tracks</span>
      </div>

      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        className="
          w-9 h-9 rounded-lg flex items-center justify-center
          bg-white/8 border border-white/10
          text-[#A8956A] hover:text-[#FEF3C7] hover:bg-white/12
          active:scale-90 transition-all duration-150
          disabled:opacity-30 disabled:cursor-not-allowed
        "
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
}
