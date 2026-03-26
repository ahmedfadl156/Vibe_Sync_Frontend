"use client";

import { PublicRoom } from "@/types/room";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { joinRoom } from "@/services/room";
import { useState } from "react";

interface RoomCardProps {
  room: PublicRoom;
}

const statusColors: Record<string, { dot: string; label: string; bg: string; text: string }> = {
  waiting: {
    dot: "bg-green-400",
    label: "Waiting",
    bg: "bg-green-500/10",
    text: "text-green-400",
  },
  active: {
    dot: "bg-amber-400 animate-pulse",
    label: "Live",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
  },
  ended: {
    dot: "bg-zinc-500",
    label: "Ended",
    bg: "bg-zinc-500/10",
    text: "text-zinc-400",
  },
};

export default function RoomCard({ room }: RoomCardProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const participantCount = room.participants.length;
  const isFull = participantCount >= room.roomLimit;
  const fillPct = Math.min((participantCount / room.roomLimit) * 100, 100);
  const status = statusColors[room.status] ?? statusColors.waiting;
  const genres = room.vibeSettings?.genres ?? [];

  const { mutate, isPending } = useMutation({
    mutationFn: () => joinRoom(room.roomCode),
    onSuccess: (data) => {
      const roomCode = data.data.room.roomCode;
      router.push(`/room/${roomCode}`);
    },
    onError: (err: Error) => {
      setError(err.message || "Could not join the room.");
    },
  });

  const hostName =
    typeof room.host === "object" ? room.host.displayName : "Unknown";

  return (
    <article
      className="
        group relative flex flex-col gap-4 rounded-2xl
        border border-white/8
        bg-[#111109]/60 backdrop-blur-sm
        p-5 overflow-hidden
        transition-all duration-300
        hover:border-[#D97706]/30 hover:shadow-[0_0_40px_rgba(217,119,6,0.08)]
        hover:-translate-y-0.5
      "
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,rgba(217,119,6,0.06),transparent_60%)]" />

      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase ${status.bg} ${status.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>

        {/* Room code */}
        <span className="font-mono text-xs text-[#A8956A]/70 bg-white/5 px-2 py-0.5 rounded-lg tracking-widest border border-white/6">
          {room.roomCode}
        </span>
      </div>

      {/* Room name */}
      <div className="flex-1 min-h-0">
        <h3 className="text-base font-bold text-[#FEF3C7] leading-snug line-clamp-2 group-hover:text-white transition-colors">
          {room.roomName}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#A8956A]">
          {/* Mic icon */}
          <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 1a4 4 0 014 4v6a4 4 0 11-8 0V5a4 4 0 014-4z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 10a7 7 0 01-14 0m7 7v3m-4 1h8"/>
          </svg>
          Hosted by <span className="font-semibold text-[#FEF3C7]/80">{hostName}</span>
        </p>
      </div>

      {/* Genres */}
      {genres.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {genres.slice(0, 4).map((g) => (
            <span
              key={g}
              className="px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide bg-[#D97706]/10 text-[#D97706]/90 border border-[#D97706]/15"
            >
              {g}
            </span>
          ))}
          {genres.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium tracking-wide bg-white/5 text-[#A8956A] border border-white/6">
              +{genres.length - 4} more
            </span>
          )}
        </div>
      )}

      {/* Capacity bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1 text-[#A8956A]">
            {/* Users icon */}
            <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 00-5.196-3.849M9 20H4v-1a4 4 0 015.196-3.849m0 0A4 4 0 1112 8a4 4 0 01-1.804 7.151zm6.804 0A4 4 0 1118 8a4 4 0 01-1.196 3.151" />
            </svg>
            Participants
          </span>
          <span className={`font-semibold ${isFull ? "text-red-400" : "text-[#FEF3C7]"}`}>
            {participantCount}
            <span className="text-[#A8956A] font-normal"> / {room.roomLimit}</span>
            {isFull && <span className="ml-1.5 text-[10px] uppercase tracking-wider bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded-md border border-red-500/20">Full</span>}
          </span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isFull ? "bg-red-500" : fillPct > 75 ? "bg-amber-500" : "bg-[#D97706]"}`}
            style={{ width: `${fillPct}%` }}
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      {/* Join button */}
      <button
        onClick={() => { setError(null); mutate(); }}
        disabled={isFull || isPending || room.status === "ended"}
        className={`
          relative w-full py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200
          ${isFull || room.status === "ended"
            ? "bg-white/5 text-[#A8956A] cursor-not-allowed border border-white/8"
            : "bg-[#D97706] text-[#1C0A00] hover:bg-[#F59E0B] active:scale-95 shadow-[0_4px_20px_rgba(217,119,6,0.25)] hover:shadow-[0_4px_28px_rgba(217,119,6,0.4)]"
          }
        `}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Joining…
          </span>
        ) : isFull ? "Room Full" : room.status === "ended" ? "Session Ended" : "Join Room →"}
      </button>
    </article>
  );
}
