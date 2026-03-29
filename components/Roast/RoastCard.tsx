'use client';

import React, { useState } from 'react'
import Image from 'next/image'
import { RoastResponse } from '@/types/roast'

interface RoastCardProps {
    roast: RoastResponse;
}

const RoastCard = ({ roast }: RoastCardProps) => {
  const { roastText } = roast.data;
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareText = `VibeSync just roasted my music taste:\n\n"${roastText}"\n\nGet roasted at VibeSync!`;
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'My VibeSync Music Roast',
                text: shareText,
                url: window.location.href,
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };
  
  return (
    <div className='relative overflow-hidden bg-linear-to-br from-[#241F1B]/90 to-[#12100E]/90 backdrop-blur-xl border border-[#FFB77D]/20 w-full rounded-3xl py-12 px-8 sm:px-12 md:px-16 shadow-2xl flex flex-col gap-10'>
        {/* Abstract Background Glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#FFB77D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#FFB77D]/5 rounded-full blur-3xl pointer-events-none" />

        {/* Roast Content */}
        <div className='relative z-10 flex flex-col items-center'>
            {/* Header / Logo */}
            <div className='flex flex-col items-center mb-8 gap-4'>
                <div className='relative flex items-center justify-center bg-linear-to-b from-[#FFB77D]/20 to-transparent p-1 rounded-2xl shadow-inner border border-[#FFB77D]/30'>
                    <div className='bg-[#241F1B] rounded-xl p-3 flex items-center justify-center'>
                        <Image src="/roast-ai.png" alt="Roast AI Logo" width={48} height={48} className="object-contain" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-px w-8 bg-linear-to-r from-transparent to-[#FFB77D]/50"></span>
                    <h2 className='text-[#FFB77D] text-sm uppercase tracking-[0.3em] font-semibold'>VibeSync Roast</h2>
                    <span className="h-px w-8 bg-linear-to-l from-transparent to-[#FFB77D]/50"></span>
                </div>
                
                {/* Source Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${roast.source === 'ai' ? 'bg-[#FFB77D]/10 text-[#FFB77D] border-[#FFB77D]/30' : 'bg-[#A8956A]/10 text-[#A8956A] border-[#A8956A]/30'}`}>
                    {roast.source === 'ai' ? 'Freshly Roasted by AI 🔥' : 'Loaded from Cache ⚡'}
                </span>
            </div>

            {/* Quote Typography */}
            <div className='w-full max-w-4xl relative'>
                {/* Visual Opening Quote */}
                <Image 
                    src="/qoute-icon.png" 
                    alt="Quote Start" 
                    width={40} 
                    height={40} 
                    className="absolute -top-6 -left-4 md:-left-12 opacity-30 select-none pointer-events-none"
                    unoptimized
                />
                
                {/* Roast Text */}
                <p className='text-center text-lg md:text-2xl font-medium max-w-4xl leading-[1.8] tracking-wide text-[#EBE0DA] my-8'>
                    "{roastText}"
                </p>

                {/* Visual Closing Quote */}
                <Image 
                    src="/qoute-icon.png" 
                    alt="Quote End" 
                    width={40} 
                    height={40} 
                    className="absolute -bottom-2 -right-4 md:-right-8 opacity-30 rotate-180 select-none pointer-events-none"
                    unoptimized
                />
            </div>
        </div>

        {/* Footer actions */}
        <div className="relative z-10 flex flex-col items-center mt-2">
            {/* Share Button Placeholder */}
            <button 
                onClick={handleShare}
                className='group relative flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-[#FFB77D]/40 rounded-full py-3 px-8 text-[#EBE0DA] font-medium tracking-wide overflow-hidden'
            >
                <div className="absolute inset-0 bg-linear-to-r from-[#FFB77D]/0 via-[#FFB77D]/10 to-[#FFB77D]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span>{copied ? 'Copied to Clipboard!' : 'Share the Roast'}</span>
                {!copied && (
                    <svg className="w-4 h-4 text-[#FFB77D] group-hover:scale-125 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                )}
                {copied && (
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>
        </div>
    </div>
  )
}

export default RoastCard