"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { generateVibePlaylist, GeneratePlaylistResponse } from "@/services/users";
import { toast } from "sonner";
import VibeSelector from "./VibeSelector";
import GenreSelector from "./GenreSelector";
import MixRatioSlider from "./MixRatioSlider";
import EraSelector from "./EraSelector";
import LengthSelector from "./LengthSelector";
import LoadingOverlay from "./LoadingOverlay";
import SuccessCard from "./SuccessCard";

function SectionCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white/3 border border-white/8 rounded-2xl p-5 md:p-6 backdrop-blur-sm">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-[#FEF3C7]">{title}</h3>
        {subtitle && <p className="text-xs text-[#A8956A] mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export default function GeneratePlaylistForm() {
  const [vibe, setVibe] = useState("Late Night Deep");
  const [genres, setGenres] = useState<string[]>(["Pop"]);
  const [arabic, setArabic] = useState(50);
  const [era, setEra] = useState("Anything");
  const [length, setLength] = useState(20);
  const [result, setResult] = useState<GeneratePlaylistResponse["data"] | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: generateVibePlaylist,
    onSuccess: (res) => {
      setResult(res.data);
      toast.success("Playlist created!", {
        description: res.message,
      });
    },
    onError: (err: Error) => {
      toast.error("Something went wrong", { description: err.message });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vibe) return toast.warning("Pick a vibe first!");
    if (genres.length === 0) return toast.warning("Select at least one genre!");

    setResult(null);
    mutate({
      vibe,
      mixRatio: { arabic, english: 100 - arabic },
      genres,
      era,
      length,
    });
  };

  const handleReset = () => {
    setResult(null);
    setVibe("Late Night Deep");
    setGenres(["Pop"]);
    setArabic(50);
    setEra("Anything");
    setLength(20);
  };

  if (result) {
    return (
      <SuccessCard
        playlistName={result.playlistName}
        playlistUrl={result.playlistUrl}
        trackCount={result.trackCount}
        onReset={handleReset}
      />
    );
  }

  return (
    <>
      {isPending && <LoadingOverlay />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Vibe */}
        <SectionCard
          title="🎭 Pick Your Vibe"
          subtitle="What mood are you in right now?"
        >
          <VibeSelector selected={vibe} onChange={setVibe} />
        </SectionCard>

        {/* Two-column grid for smaller selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Genres */}
          <SectionCard title="🎸 Genres" subtitle="Up to 3 genres">
            <GenreSelector selected={genres} onChange={setGenres} max={3} />
          </SectionCard>

          {/* Era + Length stacked */}
          <div className="space-y-4">
            <SectionCard title="📅 Era" subtitle="Which musical era?">
              <EraSelector selected={era} onChange={setEra} />
            </SectionCard>

            <SectionCard title="📋 Playlist Length" subtitle="How many tracks?">
              <LengthSelector value={length} onChange={setLength} />
            </SectionCard>
          </div>
        </div>

        {/* Mix Ratio */}
        <SectionCard
          title="🌐 Arabic / English Mix"
          subtitle="Drag to set the language balance"
        >
          <MixRatioSlider arabic={arabic} onChange={setArabic} />
        </SectionCard>

        {/* Summary chips */}
        <div className="flex flex-wrap gap-2 px-1">
          {[
            { label: vibe, icon: "🎭" },
            { label: `${arabic}% AR / ${100 - arabic}% EN`, icon: "🌐" },
            { label: genres.join(", ") || "No genre", icon: "🎵" },
            { label: era, icon: "📅" },
            { label: `${length} tracks`, icon: "📋" },
          ].map((chip) => (
            <span
              key={chip.label}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#D97706]/10 text-[#A8956A] border border-[#D97706]/20"
            >
              {chip.icon} {chip.label}
            </span>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending || !vibe || genres.length === 0}
          className="
            group relative w-full overflow-hidden
            flex items-center justify-center gap-3
            h-14 rounded-2xl font-semibold text-base tracking-wide
            bg-linear-to-r from-[#D97706] via-[#B45309] to-[#C2410C]
            text-white
            shadow-[0_4px_30px_rgba(217,119,6,0.4)]
            hover:shadow-[0_6px_40px_rgba(217,119,6,0.55)]
            hover:scale-[1.01] active:scale-[0.99]
            transition-all duration-200 ease-out
            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
          "
        >
          {/* Shimmer */}
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />

          {isPending ? (
            <>
              <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>Generating your vibe...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Generate Playlist</span>
            </>
          )}
        </button>
      </form>
    </>
  );
}
