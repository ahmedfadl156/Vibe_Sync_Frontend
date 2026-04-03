"use client"

import HipsterMeterSkeleton from "@/components/HipsterMeterSkeleton"
import { useHipsterMeter } from "@/hooks/useHipstermeter"

const CircularGauge = ({ score }: { score: number }) => {
    const radius = 92
    const circumference = 2 * Math.PI * radius
    const clampedScore = Math.min(100, Math.max(0, score))
    const arcLength = circumference * 0.75
    const filled = (clampedScore / 100) * arcLength

    return (
        <div className="relative flex items-center justify-center w-72 h-72">
            {/* Outer glow ring */}
            <div
                className="absolute inset-0 rounded-full"
                style={{ boxShadow: 'inset 0 0 40px rgba(255,183,125,0.04)' }}
            />

            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                {/* Track */}
                <circle
                    cx="100" cy="100" r={radius}
                    fill="none"
                    stroke="#2A1E10"
                    strokeWidth="6"
                    strokeDasharray={`${arcLength} ${circumference - arcLength}`}
                    strokeDashoffset={circumference * 0.125}
                    strokeLinecap="round"
                />
                {/* Fill — amber */}
                <circle
                    cx="100" cy="100" r={radius}
                    fill="none"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="6"
                    strokeDasharray={`${filled} ${circumference - filled}`}
                    strokeDashoffset={circumference * 0.125}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
                <defs>
                    <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FFB77D" />
                        <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Center text */}
            <div className="z-10 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#A8956A] mb-1 font-semibold">
                    Authenticity Index
                </span>
                <span
                    className="font-black text-[#EBE0DA] leading-none"
                    style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)' }}
                >
                    {clampedScore}
                </span>
                <span className="text-[#A8956A] text-sm font-medium">/ 100</span>
            </div>
        </div>
    )
}

const Badge = ({ label }: { label: string }) => (
    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFB77D]/15 border border-[#FFB77D]/30 backdrop-blur-md shadow-lg shadow-[#FFB77D]/5">
        <span className="text-[#FFB77D] font-bold tracking-widest text-base uppercase">{label}</span>
    </div>
)

const page = () => {
    const { data, isLoading, isError, error, refetch } = useHipsterMeter()

    const proof = data?.data.proof

    return (
        <main className="mx-auto max-w-5xl py-32 px-4 md:px-6 lg:px-8 min-h-screen">

            {/* Header */}
            <section className="flex flex-col items-center mb-14 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-[#EBE0DA] mb-4">Hipster Meter</h1>
                <p className="text-[#A8956A] text-sm md:text-lg tracking-wide font-medium max-w-2xl">
                    How underground is your taste, really? Our AI scores your musical authenticity against
                    the algorithm's mainstream grip.
                </p>
            </section>

            {/* Loading  */}
            {isLoading && <HipsterMeterSkeleton />}

            {/*  Error */}
            {isError && !isLoading && (
                <div className="flex flex-col items-center gap-4 py-24 animate-in fade-in duration-500">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-2xl">⚠</div>
                    <p className="text-red-300 font-semibold">{error?.message || "Failed to load hipster score."}</p>
                    <button
                        onClick={() => refetch()}
                        className="px-6 py-3 bg-[#241F1B] border border-[#FFB77D]/20 hover:border-[#FFB77D]/60 rounded-full text-[#FFB77D] text-sm tracking-widest transition-all"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {!isLoading && data && (
                <div className="flex flex-col items-center w-full animate-in fade-in slide-in-from-bottom-10 duration-1000">

                    {/* Gauge */}
                    <CircularGauge score={data.data.hipsterScore} />

                    {/* Badge */}
                    <div className="mt-6 mb-5">
                        <Badge label={data.data.badge} />
                    </div>

                    {/* Badge description */}
                    <p className="text-center text-[#EBE0DA]/80 text-base md:text-lg max-w-xl leading-relaxed mb-14 px-4"
                        dir="auto">
                        {data.data.badgeDescription}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

                        <div className="group bg-[#12100E]/80 border border-[#FFB77D]/15 hover:border-[#FFB77D]/35 transition-colors duration-300 rounded-3xl p-7 backdrop-blur-xl shadow-xl shadow-black/30">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-[10px] tracking-[0.3em] uppercase text-[#A8956A]/70 font-semibold">
                                    Evidence Log #01
                                </span>
                                <div className="w-7 h-7 rounded-full bg-[#FFB77D]/10 border border-[#FFB77D]/20 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-[#FFB77D]" />
                                </div>
                            </div>

                            {/* Track info */}
                            <div className="flex gap-5 items-start">
                                {/* Album art */}
                                <div className="relative shrink-0">
                                    <div className="w-28 h-28 rounded-2xl overflow-hidden border border-[#FFB77D]/10 bg-[#1A1410]">
                                        {proof?.image ? (
                                            <img
                                                src={proof.image}
                                                alt={proof.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[#FFB77D]/30 text-3xl">♪</div>
                                        )}
                                    </div>
                                    {/* ref label */}
                                    <div className="absolute bottom-1 left-1 right-1 bg-black/70 backdrop-blur-sm rounded-lg px-1 py-0.5">
                                        <p className="text-[7px] text-[#FFB77D]/40 tracking-wider truncate text-center font-mono">
                                            REF:{Math.random().toString(36).substring(2, 18).toUpperCase()}
                                        </p>
                                    </div>
                                </div>

                                {/* Track meta */}
                                <div className="flex flex-col gap-2 flex-1 min-w-0">
                                    <h3 className="text-[#EBE0DA] font-bold text-xl leading-tight" dir="auto">
                                        {proof?.name}
                                    </h3>
                                    <p className="text-[#A8956A]/70 text-xs tracking-widest uppercase font-medium">
                                        Top Recurrence · High Plays
                                    </p>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {["VIRAL", "ALGORITHM-PICK"].map(tag => (
                                            <span key={tag}
                                                className="px-2 py-0.5 rounded-full bg-[#FFB77D]/8 border border-[#FFB77D]/15 text-[#FFB77D]/60 text-[10px] tracking-widest uppercase font-semibold">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Diagnostic Roast card */}
                        <div className="group relative bg-[#12100E]/80 border border-[#FFB77D]/15 hover:border-[#FFB77D]/35 transition-colors duration-300 rounded-3xl p-7 backdrop-blur-xl shadow-xl shadow-black/30 overflow-hidden">
                            {/* Ambient glow */}
                            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#FFB77D]/5 blur-2xl pointer-events-none" />

                            {/* Badge */}
                            <div className="mb-5">
                                <span className="px-3 py-1.5 rounded-full bg-[#FFB77D]/15 border border-[#FFB77D]/25 text-[#FFB77D] text-[10px] tracking-[0.2em] uppercase font-bold">
                                    Diagnostic Roast
                                </span>
                            </div>

                            {/* Quote mark */}
                            <div className="text-[#FFB77D]/20 text-6xl font-serif leading-none mb-2 -mt-2 select-none">"</div>

                            {/* Roast message */}
                            <p className="text-[#EBE0DA]/85 text-sm md:text-base leading-relaxed font-medium italic relative z-10 mb-6" dir="auto">
                                {proof?.roastMessage}
                            </p>

                            {/* AI signature */}
                            <div className="flex items-center gap-3 border-t border-[#FFB77D]/8 pt-5">
                                <div className="w-9 h-9 rounded-full bg-[#FFB77D]/10 border border-[#FFB77D]/20 flex items-center justify-center text-base">
                                    🤖
                                </div>
                                <div>
                                    <p className="text-[#FFB77D]/80 text-xs font-bold tracking-widest uppercase">
                                        Vibe-AI Bot
                                    </p>
                                    <p className="text-[#A8956A]/50 text-[10px] tracking-wider">
                                        Sarcasm Level: Maximum
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-14 mb-20">
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({ title: 'My Hipster Score', text: `I scored ${data.data.hipsterScore}/100 on Hipster Meter! Badge: ${data.data.badge}` })
                                }
                            }}
                            className="group flex items-center gap-3 px-8 py-4 bg-[#FFB77D] hover:bg-[#F9A85A] rounded-full text-[#12100E] font-bold text-sm tracking-widest uppercase transition-all duration-300 shadow-lg shadow-[#FFB77D]/20 hover:shadow-xl hover:shadow-[#FFB77D]/30 hover:-translate-y-0.5"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            Share My Shame
                        </button>

                        <button
                            onClick={() => refetch()}
                            className="flex items-center gap-3 px-8 py-4 bg-[#1A1410] hover:bg-[#241F1B] border-2 border-[#FFB77D]/20 hover:border-[#FFB77D]/50 rounded-full text-[#EBE0DA] font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5"
                        >
                            <svg className="w-4 h-4 text-[#FFB77D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Recalculate Score
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default page