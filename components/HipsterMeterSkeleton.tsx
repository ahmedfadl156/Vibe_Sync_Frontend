const HipsterMeterSkeleton = () => {
    return (
        <div className="w-full flex flex-col items-center animate-in fade-in duration-700">
            {/* Pulsing circle gauge */}
            <div className="relative flex items-center justify-center mb-10">
                <div className="w-64 h-64 rounded-full border-4 border-[#FFB77D]/10 relative flex items-center justify-center">
                    {/* Spinning arc */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 animate-spin-slow" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="92" fill="none" stroke="#FFB77D" strokeWidth="4"
                            strokeDasharray="120 460" strokeLinecap="round" opacity="0.5" />
                    </svg>
                    <div className="flex flex-col items-center gap-2 z-10">
                        <div className="w-16 h-8 bg-[#FFB77D]/10 rounded-lg animate-pulse" />
                        <div className="w-10 h-4 bg-[#FFB77D]/10 rounded animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Badge pill skeleton */}
            <div className="w-48 h-12 bg-[#FFB77D]/10 rounded-full animate-pulse mb-6" />

            {/* Description lines */}
            <div className="flex flex-col items-center gap-3 mb-14">
                <div className="w-80 h-4 bg-[#5C4A2A]/30 rounded animate-pulse" />
                <div className="w-64 h-4 bg-[#5C4A2A]/30 rounded animate-pulse" />
                <div className="w-48 h-4 bg-[#5C4A2A]/30 rounded animate-pulse" />
            </div>

            {/* Cards skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                {/* Evidence card */}
                <div className="bg-[#1A1410]/60 border border-[#FFB77D]/10 rounded-3xl p-6 backdrop-blur-xl">
                    <div className="w-24 h-3 bg-[#FFB77D]/10 rounded animate-pulse mb-5" />
                    <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-2xl bg-[#2A1E10]/60 animate-pulse shrink-0" />
                        <div className="flex flex-col gap-3 flex-1 justify-center">
                            <div className="w-3/4 h-5 bg-[#5C4A2A]/30 rounded animate-pulse" />
                            <div className="w-1/2 h-4 bg-[#5C4A2A]/20 rounded animate-pulse" />
                            <div className="flex gap-2">
                                <div className="w-16 h-5 bg-[#FFB77D]/10 rounded-full animate-pulse" />
                                <div className="w-12 h-5 bg-[#FFB77D]/10 rounded-full animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Diagnostic card */}
                <div className="bg-[#1A1208]/60 border border-[#FFB77D]/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden">
                    <div className="w-28 h-5 bg-[#FFB77D]/15 rounded-full animate-pulse mb-5" />
                    <div className="flex flex-col gap-3">
                        <div className="w-full h-4 bg-[#5C4A2A]/30 rounded animate-pulse" />
                        <div className="w-5/6 h-4 bg-[#5C4A2A]/20 rounded animate-pulse" />
                        <div className="w-3/4 h-4 bg-[#5C4A2A]/20 rounded animate-pulse" />
                    </div>
                    <div className="flex items-center gap-3 mt-6">
                        <div className="w-8 h-8 rounded-full bg-[#FFB77D]/10 animate-pulse" />
                        <div className="flex flex-col gap-1">
                            <div className="w-20 h-3 bg-[#5C4A2A]/30 rounded animate-pulse" />
                            <div className="w-28 h-3 bg-[#5C4A2A]/20 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scanning text */}
            <div className="mt-12 flex items-center gap-3 text-[#FFB77D]/50">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB77D] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB77D]" />
                </span>
                <span className="text-xs tracking-[0.3em] uppercase font-medium animate-pulse">
                    Scanning your listening data...
                </span>
            </div>
        </div>
    )
}

export default HipsterMeterSkeleton