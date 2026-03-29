'use client';

import React from 'react';
import RoastCard from "@/components/Roast/RoastCard";
import RoastLoader from "@/components/Roast/RoastLoader";
import { useMusicRoast } from "@/hooks/useRoast";

const page = () => {
    const { mutate, data: roastData, isPending, isError, error } = useMusicRoast();

    return (
        <main className="mx-auto max-w-7xl py-32 px-4 md:px-6 lg:px-8 min-h-screen">
            {/* Header Section */}
            <section className="flex flex-col items-center mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-[#EBE0DA] mb-4">Your Music Roast</h1>
                <p className="text-[#A8956A] text-sm md:text-lg tracking-wide font-medium max-w-2xl">
                    Uncover your musical identity. Beyond Wrapped. Let our AI brutally judge your listening history and curate a therapy playlist to fix it.
                </p>
            </section>

            {/* Main Content Area */}
            <div className="flex flex-col items-center w-full">
                {!isPending && !roastData && (
                    <div className="flex flex-col items-center justify-center py-12 animate-in fade-in zoom-in-95 duration-700">
                        <button 
                            onClick={() => mutate()}
                            className="group relative px-10 py-5 bg-[#241F1B] border-2 border-[#FFB77D]/30 hover:border-[#FFB77D] rounded-full text-[#EBE0DA] text-lg font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-2xl hover:shadow-[#FFB77D]/20 overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                <span className="text-2xl">🔥</span>
                                Roast My Taste
                            </span>
                            <div className="absolute inset-0 bg-linear-to-r from-[#FFB77D]/0 via-[#FFB77D]/10 to-[#FFB77D]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </button>
                        
                        {isError && (
                            <div className="mt-8 px-6 py-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-200 text-center max-w-md animate-in fade-in slide-in-from-top-4">
                                <p className="font-semibold mb-1">Failed to generate roast.</p>
                                <p className="text-sm opacity-80">{error?.message || "An unexpected error occurred."}</p>
                            </div>
                        )}
                    </div>
                )}

                {isPending && <RoastLoader />}

                {!isPending && roastData && (
                    <div className="w-full flex flex-col items-center max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        {/* Interactive Area */}
                        <div className="w-full relative">
                            {/* Try Again Button (Top Right) */}
                            <div className="absolute -top-16 right-0 md:right-4 z-50">
                                <button 
                                    onClick={() => mutate()}
                                    className="px-4 py-2 bg-[#241F1B]/80 hover:bg-[#241F1B] border border-[#FFB77D]/20 hover:border-[#FFB77D]/50 rounded-full text-xs md:text-sm text-[#FFB77D] tracking-wider transition-all"
                                >
                                    Re-Roast (If you dare)
                                </button>
                            </div>

                            {/* Main Roast Card */}
                            <RoastCard roast={roastData} />
                        </div>

                        {/* Details Grid: Separated under the card */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-12 mb-20 relative z-10">
                            {/* Guilty Pleasures */}
                            <div className="bg-[#12100E]/80 border border-red-500/20 hover:border-red-500/40 transition-colors duration-300 rounded-3xl p-8 backdrop-blur-xl shadow-xl shadow-red-900/5 group">
                                <div className="flex items-center gap-3 mb-6 relative">
                                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    </div>
                                    <h3 className="text-red-400 font-bold tracking-widest uppercase text-base">Guilty Pleasures</h3>
                                    <div className="h-px bg-linear-to-r from-red-500/20 to-transparent flex-1 absolute right-0 w-1/2"></div>
                                </div>
                                <ul className="space-y-4">
                                    {roastData.data.guiltyPleasures.map((track, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[#EBE0DA] group/item">
                                            <span className="text-red-500/60 font-bold group-hover/item:text-red-400 transition-colors">×</span>
                                            <span className="font-medium text-sm md:text-lg opacity-80 group-hover/item:opacity-100 transition-opacity">{track}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Therapy Playlist */}
                            <div className="bg-[#12100E]/80 border border-[#A8956A]/30 hover:border-[#A8956A]/60 transition-colors duration-300 rounded-3xl p-8 backdrop-blur-xl shadow-xl shadow-[#A8956A]/5 group">
                                <div className="flex items-center gap-3 mb-6 relative">
                                    <div className="w-10 h-10 rounded-full bg-[#A8956A]/10 flex items-center justify-center text-[#A8956A] group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
                                    </div>
                                    <h3 className="text-[#A8956A] font-bold tracking-widest uppercase text-base">Sound Therapy</h3>
                                    <div className="h-px bg-linear-to-r from-[#A8956A]/30 to-transparent flex-1 absolute right-0 w-1/2"></div>
                                </div>
                                <ul className="space-y-4">
                                    {roastData.data.therapyPlaylist.map((track, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[#EBE0DA] group/item">
                                            <span className="text-[#A8956A]/60 font-bold group-hover/item:text-[#A8956A] transition-colors">♪</span>
                                            <span className="font-medium text-sm md:text-lg opacity-80 group-hover/item:opacity-100 transition-opacity">{track}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default page