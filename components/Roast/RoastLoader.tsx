'use client';

import { useState, useEffect } from 'react';

const loadingMessages = [
  "Analyzing your music library...",
  "Scanning your guilty pleasures...",
  "Running AI Roast Protocol...",
  "Cooking up something spicy...",
  "Almost there, finalizing the burn...",
];

const RoastLoader = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => {
          if(prev === loadingMessages.length - 1) return prev;
          return prev + 1;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 md:py-32 w-full animate-in fade-in duration-700">
        <div className="relative flex items-center justify-center w-32 h-32 mb-10">
            <div className="absolute inset-0 border-t-4 border-transparent border-t-[#FFB77D] rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
            <div className="absolute inset-3 border-r-4 border-transparent border-r-[#A8956A] rounded-full animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
            <div className="absolute inset-6 border-b-4 border-transparent border-b-[#EBE0DA] rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            <div className="text-4xl animate-pulse">🔥</div>
        </div>
        
        <h3 className="text-2xl md:text-3xl font-bold text-[#EBE0DA] mb-4 text-center transition-opacity duration-500">
            {loadingMessages[messageIndex]}
        </h3>
        <p className="text-[#A8956A] text-sm md:text-base text-center max-w-sm tracking-wide">
            The AI takes a moment to process your complicated listening history. This is completely normal (unlike your music taste).
        </p>
    </div>
  );
};

export default RoastLoader;

