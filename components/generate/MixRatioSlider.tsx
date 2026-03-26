"use client";

interface MixRatioSliderProps {
  arabic: number;
  onChange: (arabic: number) => void;
}

export default function MixRatioSlider({ arabic, onChange }: MixRatioSliderProps) {
  const english = 100 - arabic;

  return (
    <div className="space-y-4">
      {/* Labels */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start">
          <span className="text-xs uppercase tracking-widest text-[#A8956A] mb-0.5">🇪🇬 Arabic</span>
          <span className="text-3xl font-bold text-[#D97706] tabular-nums">{arabic}%</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="h-px w-8 bg-white/15" />
          <span className="mx-3 text-xs text-[#A8956A]/60">vs</span>
          <div className="h-px w-8 bg-white/15" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs uppercase tracking-widest text-[#A8956A] mb-0.5">🌍 English</span>
          <span className="text-3xl font-bold text-[#FEF3C7] tabular-nums">{english}%</span>
        </div>
      </div>

      {/* Dual-color bar */}
      <div className="relative h-2 rounded-full overflow-hidden bg-white/8">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-[#D97706] to-[#F59E0B]"
          style={{ width: `${arabic}%`, transition: "width 0.1s" }}
        />
      </div>

      {/* Range input */}
      <input
        id="mix-ratio-slider"
        type="range"
        min={0}
        max={100}
        step={5}
        value={arabic}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          w-full appearance-none h-2 bg-transparent cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-[#D97706]
          [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(217,119,6,0.5)]
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-[#FEF3C7]/30
          [&::-webkit-slider-thumb]:transition-transform
          [&::-webkit-slider-thumb]:hover:scale-110
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-[#D97706]
          [&::-moz-range-thumb]:border-0
        "
      />

      {/* Tick marks */}
      <div className="flex justify-between text-[10px] text-[#A8956A]/50 px-0.5">
        <span>100% AR</span>
        <span>50/50</span>
        <span>100% EN</span>
      </div>
    </div>
  );
}
