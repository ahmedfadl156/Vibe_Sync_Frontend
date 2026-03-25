"use client";

import { useLibrary } from "@/hooks/useLibrary";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { LibraryHeader } from "@/components/library/LibraryHeader";
import { TopArtists } from "@/components/library/TopArtists";
import { TopTracks } from "@/components/library/TopTracks";
import { useEffect } from "react";

const LibraryPage = () => {
    const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
    const router = useRouter();

    const { data: libraryData, isLoading: isLibraryLoading, error } = useLibrary();

    // Redirect to login if unauthenticated
    useEffect(() => {
        if (!isAuthLoading && !isAuthenticated) {
            router.push('/'); // Or redirect to spotify auth directly
        }
    }, [isAuthLoading, isAuthenticated, router]);

    if (isAuthLoading || isLibraryLoading) {
        return (
            <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#D97706]/30 border-t-[#D97706] rounded-full animate-spin"></div>
                    <p className="text-[#A8956A] font-medium animate-pulse">Loading your vibes...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    if (error) {
        return (
            <div className="min-h-screen pt-24 pb-20 px-4 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
                <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8 max-w-md">
                    <h2 className="text-2xl font-bold text-red-400 mb-2">Oops!</h2>
                    <p className="text-[#EBE0DA]/70">We couldn&apos;t load your local library. Please try reconnecting to Spotify.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto selection:bg-[#D97706]/30 selection:text-white">
            <LibraryHeader />
            
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
                {libraryData?.data.artists && (
                    <TopArtists artists={libraryData.data.artists} />
                )}

                {libraryData?.data.tracks && (
                    <TopTracks tracks={libraryData.data.tracks} />
                )}
            </div>
        </main>
    );
};

export default LibraryPage;