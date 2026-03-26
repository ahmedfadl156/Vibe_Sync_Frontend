"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublicRooms } from "@/services/room";
import RoomCard from "@/components/room/RoomCard";
import Link from "next/link";

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#111109]/60 p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-20 rounded-full bg-white/8" />
        <div className="h-5 w-24 rounded-lg bg-white/8" />
      </div>
      <div className="space-y-2">
        <div className="h-5 w-3/4 rounded-md bg-white/8" />
        <div className="h-3.5 w-1/2 rounded-md bg-white/6" />
      </div>
      <div className="flex gap-1.5">
        <div className="h-5 w-16 rounded-md bg-white/8" />
        <div className="h-5 w-20 rounded-md bg-white/8" />
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <div className="h-3 w-24 rounded bg-white/6" />
          <div className="h-3 w-12 rounded bg-white/6" />
        </div>
        <div className="h-1.5 rounded-full bg-white/8" />
      </div>
      <div className="h-10 rounded-xl bg-white/8 mt-1" />
    </div>
  );
}

export default function RoomsPage() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["publicRooms"],
    queryFn: getPublicRooms,
    refetchInterval: 15_000,
  });

  const rooms = data?.data ?? [];

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-4 sm:px-6 overflow-x-hidden">
      {/* Analog grain */}
      <div className="analog-grain" />

      {/* Background ambience */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden">
        <div className="-mt-40 w-[800px] h-[800px] rounded-full bg-[#D97706]/5 blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D97706] mb-2">
              Discover
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FEF3C7] leading-tight">
              Public Rooms
            </h1>
            <p className="mt-2 text-[#A8956A] text-sm max-w-md">
              Jump into a live music room with fellow listeners. Pick your vibe, join the queue, and sync up.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => refetch()}
              title="Refresh rooms"
              className="
                flex items-center gap-2 px-4 py-2 rounded-xl
                border border-white/8 bg-white/5 text-[#A8956A] text-sm font-medium
                hover:border-white/15 hover:text-[#FEF3C7] hover:bg-white/8
                transition-all duration-200 active:scale-95
              "
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m0 0A8 8 0 0112 4a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-7.418-5h-.582m15.836 0h-.582A8 8 0 0112 20" />
              </svg>
              Refresh
            </button>

            <Link
              href="/create-room"
              className="
                flex items-center gap-2 px-5 py-2 rounded-xl
                bg-[#D97706] text-[#1C0A00] text-sm font-bold tracking-wide
                hover:bg-[#F59E0B] active:scale-95
                transition-all duration-200
                shadow-[0_4px_20px_rgba(217,119,6,0.28)]
              "
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Room
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        {!isLoading && !isError && (
          <div className="mb-8 flex items-center gap-6 text-sm text-[#A8956A]">
            <span>
              <span className="font-bold text-[#FEF3C7]">{rooms.length}</span>{" "}
              {rooms.length === 1 ? "room" : "rooms"} available
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>
              <span className="font-bold text-[#FEF3C7]">
                {rooms.filter((r) => r.status === "active").length}
              </span>{" "}
              live now
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>
              <span className="font-bold text-[#FEF3C7]">
                {rooms.reduce((acc, r) => acc + r.participants.length, 0)}
              </span>{" "}
              listeners in-sync
            </span>
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div>
              <p className="text-[#FEF3C7] font-semibold text-lg">Couldn't load rooms</p>
              <p className="text-sm text-[#A8956A] mt-1">
                {(error as Error)?.message ?? "Something went wrong. Please try again."}
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="px-5 py-2.5 rounded-xl bg-[#D97706] text-[#1C0A00] font-bold text-sm hover:bg-[#F59E0B] active:scale-95 transition-all duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && rooms.length === 0 && (
          <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
            {/* Waveform graphic */}
            <svg className="w-20 h-20 opacity-20" viewBox="0 0 80 80" fill="none">
              <rect x="6" y="28" width="8" height="24" rx="4" fill="#D97706" />
              <rect x="20" y="14" width="8" height="52" rx="4" fill="#D97706" opacity="0.8" />
              <rect x="34" y="22" width="8" height="36" rx="4" fill="#D97706" opacity="0.6" />
              <rect x="48" y="8" width="8" height="64" rx="4" fill="#D97706" opacity="0.9" />
              <rect x="62" y="26" width="8" height="28" rx="4" fill="#D97706" opacity="0.5" />
            </svg>
            <div>
              <p className="text-[#FEF3C7] font-bold text-xl">No rooms yet</p>
              <p className="text-sm text-[#A8956A] mt-1.5 max-w-xs mx-auto">
                The airwaves are quiet. Be the first to drop a vibe and invite others.
              </p>
            </div>
            <Link
              href="/create-room"
              className="
                flex items-center gap-2 px-6 py-3 rounded-xl mt-1
                bg-[#D97706] text-[#1C0A00] text-sm font-bold tracking-wide
                hover:bg-[#F59E0B] active:scale-95
                transition-all duration-200
                shadow-[0_4px_24px_rgba(217,119,6,0.3)]
              "
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Start a Room
            </Link>
          </div>
        )}

        {/* Grid of rooms */}
        {!isLoading && !isError && rooms.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
