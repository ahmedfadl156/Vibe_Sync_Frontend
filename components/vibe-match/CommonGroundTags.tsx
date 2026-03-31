"use client";

import { motion, Variants } from "framer-motion";

interface CommonGroundTagsProps {
    tags: string[];
}

const CommonGroundTags = ({ tags }: CommonGroundTagsProps) => {
    
    if (!tags || tags.length === 0) return null;

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 1.5
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8, y: 10 },
        show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" } }
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-12 text-center px-4">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#ffb77d] font-semibold mb-6">
                Common Ground
            </h4>
            
            <motion.div 
                className="flex flex-wrap justify-center gap-3"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                {tags.map((tag, index) => (
                    <motion.div
                        key={tag + index}
                        variants={itemVariants}
                        className="px-5 py-2.5 rounded-full border border-white/5 bg-[#1A1412] text-[#ebe0da] text-sm font-medium hover:bg-white/5 hover:border-[#ffb77d]/50 hover:text-[#ffb77d] transition-all cursor-default shadow-md"
                    >
                        {tag}
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default CommonGroundTags;
