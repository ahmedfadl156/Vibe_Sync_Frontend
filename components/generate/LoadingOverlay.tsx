"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { label: "Gathering Tracks", emoji: "⏳", sub: "Scanning Spotify for the best music pool..." },
  { label: "AI is curating your vibe", emoji: "🤖", sub: "Our AI is picking the perfect songs just for you..." },
  { label: "Syncing to Spotify", emoji: "🎵", sub: "Building your playlist in your Spotify account..." },
];

export default function LoadingOverlay() {
  const [stepIndex, setStepIndex] = useState(0);
  const [dots, setDots] = useState(".");

  // Advance steps every 5 s
  useEffect(() => {
    const id = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Animate trailing dots
  useEffect(() => {
    const id = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(id);
  }, []);

  const step = STEPS[stepIndex];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0D0906]/90 backdrop-blur-xl">
      {/* Pulsing ring */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-4 border-[#D97706]/20 border-t-[#D97706] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-4xl animate-pulse">
          {step.emoji}
        </div>
      </div>

      {/* Step label */}
      <h2 className="text-2xl font-bold text-[#FEF3C7] text-center">
        {step.label}<span className="text-[#D97706]">{dots}</span>
      </h2>
      <p className="mt-2 text-sm text-[#A8956A] text-center max-w-xs">{step.sub}</p>

      {/* Progress pills */}
      <div className="flex gap-2 mt-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-700 ${
              i <= stepIndex ? "w-8 bg-[#D97706]" : "w-3 bg-white/15"
            }`}
          />
        ))}
      </div>

      <p className="mt-6 text-xs text-[#A8956A]/50">This can take up to 15 seconds — hang tight!</p>
    </div>
  );
}
