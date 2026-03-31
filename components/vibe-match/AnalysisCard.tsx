"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface AnalysisCardProps {
    analysis: string;
}

const AnalysisCard = ({ analysis }: AnalysisCardProps) => {
    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="w-full max-w-3xl mx-auto mt-6 px-2"
        >
            <div className="relative group rounded-3xl p-px overflow-hidden">
                {/* Subtle border glowing gradient animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#ffb77d]/30 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />
                
                <div className="relative bg-[#1A1412] backdrop-blur-xl rounded-[23px] p-6 text-center md:pb-12 md:pt-10 md:px-10 border border-white/5 shadow-2xl group-hover:bg-[#1A1412]/90 transition-colors">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="p-2 border border-[#ffb77d]/20 bg-[#ffb77d]/10 rounded-full shadow-inner flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-[#ffb77d]" />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-[#ebe0da] tracking-wide">
                            AI Vibe Check
                        </h3>
                    </div>
                    
                    <p className="text-[#ebe0da]/80 leading-loose text-base md:text-lg font-light selection:bg-[#ffb77d]/30 selection:text-white">
                        {analysis}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default AnalysisCard;
