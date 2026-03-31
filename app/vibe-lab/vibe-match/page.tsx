"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Link2, Sparkles, Check, Music2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";


const VibeMatchGeneratorPage = () => {
    const { user, isAuthenticated } = useAuth();
    const [copied, setCopied] = useState(false);

    const generateLink = () => {
        if (!user?._id) {
            toast.error("Please log in to generate your Vibe Link.");
            return;
        }

        const link = `${window.location.origin}/vibe-lab/vibe-match/${user._id}`;
        
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            toast.success("Vibe Link copied to clipboard!");
            setTimeout(() => setCopied(false), 3000);
        }).catch(() => {
            toast.error("Failed to copy link. Please manually copy it.");
        });
    };

    if (!isAuthenticated) {
        return (
            <main className="mx-auto max-w-7xl py-16 md:py-24 px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-20 h-20 bg-[#ffb77d]/20 rounded-full flex items-center justify-center mb-6">
                    <Music2 className="w-10 h-10 text-[#ffb77d]" />
                </div>
                <h1 className="text-3xl font-bold text-[#ebe0da] mb-4">
                    Vibe Match
                </h1>
                <p className="text-[#ebe0da]/70 max-w-md text-center">
                    Connect your Spotify account to discover your musical compatibility with friends and get hilariously roasted by AI!
                </p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-7xl py-32 px-4 md:px-6 lg:px-8 flex flex-col items-center min-h-[70vh]">
            <div className="w-full max-w-2xl flex flex-col items-center mt-12">
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full bg-[#1A1412]/80 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-3xl text-center relative overflow-hidden group"
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#ffb77d]/5 rounded-full blur-[100px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 rounded-2xl border border-[#ffb77d]/40 flex items-center justify-center text-[#ffb77d] bg-[#0D0906]/60 backdrop-blur-md shadow-lg mb-8 rotate-3 transition-transform group-hover:rotate-6">
                            <Sparkles className="w-8 h-8" />
                        </div>

                        <h1 className="text-4xl md:text-5xl font-extrabold text-[#ebe0da] mb-4 tracking-tight">
                            The Vibe <span className="italic text-[#ffb77d]">Match</span>
                        </h1>
                        
                        <p className="text-[#ebe0da]/70 mb-10 max-w-md leading-relaxed font-light">
                            Curious how your music taste matches up with your friends? Generate your unique link and let the AI compile the ultimate compatibility score.
                        </p>

                        <button 
                            onClick={generateLink}
                            className="bg-[#ffb77d] hover:bg-[#ffb77d]/90 text-[#0D0906] font-semibold py-4 px-8 rounded-full transition-all active:scale-95 flex items-center justify-center gap-2 group/btn w-full max-w-sm shadow-lg shadow-[#ffb77d]/10 text-lg"
                        >
                            {copied ? (
                                <><Check className="w-5 h-5" /> Link Copied!</>
                            ) : (
                                <><Link2 className="w-5 h-5 transition-transform group-hover/btn:-rotate-12" /> Generate Vibe Link</>
                            )}
                        </button>
                        
                        {copied && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-6 flex flex-col items-center"
                            >
                                <p className="text-sm text-[#ebe0da]/60 mb-2">Send this copied link to a friend to begin.</p>
                                <div className="bg-black/30 border border-white/5 px-4 py-2 rounded-lg text-[#ebe0da]/40 text-xs font-mono break-all max-w-[90%] select-all">
                                    {`${window.location.origin}/vibe-lab/vibe-match/${user?._id}`}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </main>
    );
};

export default VibeMatchGeneratorPage;