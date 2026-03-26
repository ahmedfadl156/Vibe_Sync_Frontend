"use client";

interface SuccessCardProps {
  playlistName: string;
  playlistUrl: string;
  trackCount: number;
  onReset: () => void;
}

export default function SuccessCard({ playlistName, playlistUrl, trackCount, onReset }: SuccessCardProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
      <div className="relative overflow-hidden rounded-3xl border border-[#D97706]/30 bg-linear-to-br from-[#D97706]/15 via-[#1C0A00]/60 to-[#4D7C5F]/10 p-8 text-center shadow-[0_0_60px_rgba(217,119,6,0.2)]">
        {/* Shimmer overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-transparent via-white/3 to-transparent -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite]" />

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-[#D97706] to-[#C2410C] shadow-[0_0_30px_rgba(217,119,6,0.5)]">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.224-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.973c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 01.257 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.612-1.156a.935.935 0 11-.543-1.79c3.532-1.073 9.404-.866 13.115 1.337a.936.936 0 01-1.028 1.556l.068.053z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="mb-1">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#D97706]/20 text-[#D97706] border border-[#D97706]/30 mb-3">
            ✓ Playlist Created
          </span>
        </div>
        <h2 className="text-2xl font-bold text-[#FEF3C7] mb-1 px-4 leading-tight">
          {playlistName}
        </h2>
        <p className="text-sm text-[#A8956A] mb-8">
          {trackCount} hand-picked tracks, ready to vibe 🎧
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full
              bg-[#1DB954] text-white font-semibold text-sm
              hover:bg-[#1ed760] active:scale-95
              transition-all duration-200
              shadow-[0_4px_20px_rgba(29,185,84,0.35)]
            "
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.224-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.973c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 01.257 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.612-1.156a.935.935 0 11-.543-1.79c3.532-1.073 9.404-.866 13.115 1.337a.936.936 0 01-1.028 1.556l.068.053z" />
            </svg>
            Open in Spotify
          </a>
          <button
            type="button"
            onClick={onReset}
            className="
              inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full
              border border-white/15 bg-white/5 text-[#A8956A] font-semibold text-sm
              hover:text-[#FEF3C7] hover:border-white/25 hover:bg-white/8
              active:scale-95 transition-all duration-200
            "
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Generate Another
          </button>
        </div>
      </div>
    </div>
  );
}
