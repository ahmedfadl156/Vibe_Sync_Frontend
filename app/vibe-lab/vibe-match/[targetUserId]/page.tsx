"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { generateVibeMatch, generateBlendPlaylist } from "@/services/vibeMatch";
import { VibeMatchData } from "@/types/vibeMatch";
import { toast } from "sonner";
import { Loader2, Music2, Share2, PlayCircle } from "lucide-react";
import MatchScoreHeader from "@/components/vibe-match/MatchScoreHeader";
import AnalysisCard from "@/components/vibe-match/AnalysisCard";
import CommonGroundTags from "@/components/vibe-match/CommonGroundTags";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TargetUserVibeMatchPage() {
    const { targetUserId } = useParams<{ targetUserId: string }>();
    const { isAuthenticated, user, isLoading: authLoading } = useAuth();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingBlend, setIsGeneratingBlend] = useState(false);
    const [matchData, setMatchData] = useState<VibeMatchData | null>(null);
    const [targetUserName, setTargetUserName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleGenerateBlend = useCallback(async () => {
        if (!targetUserId) return;

        setIsGeneratingBlend(true);

        try {
            const response = await generateBlendPlaylist(targetUserId);
            toast.success(response.message || "Blend playlist generated successfully!");
            if (response.playlistUrl) {
                window.open(response.playlistUrl, '_blank');
            }
        } catch (err: any) {
            console.error("Blend generation error:", err);
            toast.error(err.message || "Failed to generate blend playlist.");
        } finally {
            setIsGeneratingBlend(false);
        }
    }, [targetUserId]);

    useEffect(() => {
        if (!targetUserId || authLoading || !isAuthenticated) return;

        const fetchMatch = async () => {
            setIsLoading(true);
            setError(null);
            
            try {
                const response = await generateVibeMatch(targetUserId);
                setMatchData(response.data);
                setTargetUserName(response.targetUserName);
            } catch (err: any) {
                console.error("Match error:", err);
                setError(err.message || "Failed to calculate vibe match.");
                toast.error("Could not fetch the Vibe Match. Check if the user exists.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchMatch();
    }, [targetUserId, authLoading, isAuthenticated]);

    if (authLoading) {
        return (
            <main className="mx-auto max-w-7xl py-24 px-4 flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-[#ffb77d]" />
            </main>
        );
    }

    if (!isAuthenticated) {
        return (
            <main className="mx-auto max-w-7xl py-16 md:py-24 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[70vh]">
                <div className="w-20 h-20 bg-[#ffb77d]/10 rounded-full flex items-center justify-center mb-8 border border-[#ffb77d]/20">
                    <Music2 className="w-10 h-10 text-[#ffb77d]" />
                </div>
                <h1 className="text-4xl font-bold text-[#ebe0da] mb-6 tracking-tight">You've been challenged!</h1>
                <p className="text-[#ebe0da]/70 max-w-md text-center mb-10 text-lg font-light leading-relaxed">
                    To see your Vibe Match, you need to connect your Spotify account first. The AI is waiting to judge your music taste.
                </p>
                <a 
                    href={`${API_URL}/auth/login`}
                    className="bg-[#ffb77d] hover:bg-[#ffb77d]/90 text-[#0D0906] font-bold rounded-full px-10 py-4 transition-all active:scale-95 shadow-lg shadow-[#ffb77d]/20"
                >
                    Connect Spotify
                </a>
            </main>
        );
    }

    if (error) {
        return (
            <main className="mx-auto max-w-7xl py-24 px-4 flex flex-col items-center justify-center min-h-[60vh]">
                <p className="text-[#ffb77d] font-medium mb-6 text-xl">{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className="px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-[#ebe0da] transition-colors"
                >
                    Try Again
                </button>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-7xl py-12 md:py-20 px-4 md:px-6 lg:px-8 flex flex-col items-center min-h-screen">
            {!matchData && isLoading && (
                <div className="flex flex-col items-center justify-center py-32 w-full">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full border border-white/10 border-t-[#ffb77d] animate-spin" />
                        <Music2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-[#ffb77d] animate-pulse" />
                    </div>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        className="mt-10 text-2xl font-bold tracking-tight text-[#ebe0da]"
                    >
                        Calculating Vibe Compatibility
                    </motion.p>
                    <p className="mt-3 text-[#ebe0da]/50 font-light">The AI is roasting your taste right now...</p>
                </div>
            )}

            {matchData && (
                <div className="w-full flex justify-center flex-col pb-24 fade-in duration-700 animate-in mx-auto">
                    
                    {/* Header: Avatars & Score */}
                    <MatchScoreHeader 
                        score={matchData.matchScore} 
                        currentUserName={user?.displayName || "You"}
                        targetUserName={targetUserName}
                        currentUserAvatar={user?.avatar}
                    />

                    {/* AI Analysis Card */}
                    <AnalysisCard analysis={matchData.analysis} />

                    {/* Common Ground Genres / Artists */}
                    {matchData.commonGround && matchData.commonGround.length > 0 && (
                        <CommonGroundTags tags={matchData.commonGround} />
                    )}

                    {/* Call to Actions */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.6 }}
                        className="mt-20 flex flex-col md:flex-row gap-4 items-center justify-center w-full max-w-2xl mx-auto"
                    >
                        <button
                            className="w-full md:flex-1 py-4 px-6 rounded-full bg-[#ffb77d] hover:bg-[#ffb77d]/90 text-[#0D0906] font-bold shadow-lg shadow-[#ffb77d]/10 transition-all active:scale-95 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleGenerateBlend}
                            disabled={isGeneratingBlend}
                        >
                            {isGeneratingBlend ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                    Brewing your Blend... 
                                </>
                            ) : (
                                <>
                                    <PlayCircle className="w-5 h-5 mr-3" />
                                    Generate Blend Playlist
                                </>
                            )}
                        </button>
                        
                        <button
                            className="w-full md:flex-1 py-4 px-6 rounded-full bg-white/5 border border-white/10 text-[#ebe0da] hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center"
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                toast.success("Match verified! Link copied back to your clipboard");
                            }}
                        >
                            <Share2 className="w-5 h-5 mr-3" />
                            Share Result
                        </button>
                    </motion.div>

                </div>
            )}
        </main>
    );
}
