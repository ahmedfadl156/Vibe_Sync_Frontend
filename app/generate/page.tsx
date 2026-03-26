"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import GeneratePlaylistForm from "@/components/generate/GeneratePlaylistForm";

export default function GeneratePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#D97706]/30 border-t-[#D97706] rounded-full animate-spin" />
          <p className="text-[#A8956A] font-medium animate-pulse">Loading your vibes...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background glow blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D97706]/8 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#4D7C5F]/8 blur-[100px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-[#C2410C]/6 blur-[80px]" />
      </div>

      <main className="relative z-10 min-h-screen pt-28 pb-20 px-4 md:px-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D97706]/15 border border-[#D97706]/30 text-xs font-semibold text-[#D97706] mb-4">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI-Powered
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#FEF3C7] mb-3">
            Generate Your{" "}
            <span className="bg-clip-text text-transparent bg-linear-to-r from-[#D97706] to-[#F59E0B]">
              Vibe
            </span>
          </h1>
          <p className="text-[#A8956A] text-base md:text-lg max-w-md mx-auto">
            Tell us your mood. Our AI will mine Spotify and curate the perfect playlist just for you.
          </p>
        </div>

        {/* Form */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out delay-100">
          <GeneratePlaylistForm />
        </div>
      </main>
    </div>
  );
}
