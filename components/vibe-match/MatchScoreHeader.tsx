"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface MatchScoreHeaderProps {
    currentUserAvatar?: string;
    targetUserAvatar?: string;
    currentUserName?: string;
    targetUserName?: string;
    score: number;
}

const MatchScoreHeader = ({
    currentUserAvatar,
    targetUserAvatar,
    currentUserName,
    targetUserName,
    score
}: MatchScoreHeaderProps) => {

    const currentAvatarUrl = currentUserAvatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${currentUserName || 'User'}`;
    const targetAvatarUrl = targetUserAvatar || `https://api.dicebear.com/7.x/pixel-art/svg?seed=${targetUserName || 'Guest'}`;

    return (
        <div className="relative flex items-center justify-center w-full max-w-3xl mx-auto py-12 px-2 select-none">
            <div className="absolute top-1/2 left-10 right-10 md:left-24 md:right-24 h-px bg-white/10 -translate-y-1/2 z-0" />
            
            <motion.div 
                className="absolute top-1/2 left-10 md:left-24 h-[2px] bg-gradient-to-r from-transparent via-[#ffb77d] to-transparent -translate-y-1/2 z-0"
                initial={{ width: "0%", opacity: 0 }}
                animate={{ width: "calc(100% - 80px)", opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />

            <div className="flex w-full justify-between items-center z-10">
                {/* Current User Avatar */}
                <motion.div 
                    className="flex flex-col items-center"
                    initial={{ scale: 0, opacity: 0, x: -20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-white/10 bg-[#1A1412] flex items-center justify-center overflow-hidden shadow-xl z-20">
                        <img src={currentAvatarUrl} alt="You" className="w-full h-full object-cover" />
                    </div>
                    <span className="mt-4 font-bold text-[#ebe0da] tracking-wide text-sm md:text-base">You</span>
                </motion.div>

                {/* Score Center badge */}
                <motion.div 
                    className="relative shrink-0 mx-4 z-30"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.8 }}
                >
                    {/* Glowing ring */}
                    <div className="absolute inset-[-10px] rounded-full bg-[#ffb77d]/20 blur-[20px] animate-pulse" />
                    
                    <div className="relative w-28 h-28 md:w-36 md:h-36 bg-[#1A1412] border border-[#ffb77d]/30 rounded-full flex flex-col items-center justify-center shadow-2xl overflow-hidden backdrop-blur-xl group">
                        <div className="absolute inset-0 bg-[#ffb77d]/5 group-hover:bg-[#ffb77d]/10 transition-colors" />
                        <span className="text-4xl md:text-5xl font-black text-[#ebe0da] italic tracking-tighter">
                            <Counter value={score} />%
                        </span>
                        <span className="text-[10px] md:text-xs text-[#ffb77d] font-mono tracking-widest mt-1 opacity-80 uppercase">Match</span>
                    </div>
                </motion.div>

                {/* Target User Avatar */}
                <motion.div 
                    className="flex flex-col items-center"
                    initial={{ scale: 0, opacity: 0, x: 20 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                >
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-white/10 bg-[#1A1412] flex items-center justify-center overflow-hidden shadow-xl z-20">
                        <img src={targetAvatarUrl} alt={targetUserName || "Target"} className="w-full h-full object-cover" />
                    </div>
                    <span className="mt-4 font-bold text-[#ebe0da] tracking-wide text-sm md:text-base">{targetUserName || "Target"}</span>
                </motion.div>
            </div>
        </div>
    );
};

// Animated counter component
const Counter = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 1500; // ms
        const incrementTime = 20; 
        const steps = duration / incrementTime;
        const stepValue = value / steps;
        
        const timer = setInterval(() => {
            start += stepValue;
            if (start >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.ceil(start));
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value]);

    return <>{count}</>;
};

export default MatchScoreHeader;
