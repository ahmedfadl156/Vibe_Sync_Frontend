import Image from "next/image";
import { ArrowRight, Brain, TrendingDown, Heart } from "lucide-react";
import Link from "next/link";

const VIBE_LAB_CARDS = [
    {
        id: 'musical-roast',
        colSpan: 'md:col-span-7',
        height: 'h-[450px]',
        image: '/card-1.png',
        imageClassName: 'object-cover transition-transform duration-700 group-hover:scale-105 opacity-60',
        content: (
            <>
                <div className="absolute inset-0 bg-linear-to-t from-[#0D0906] via-[#0D0906]/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <div className="p-6 rounded-2xl bg-[#1A1412]/60 border border-white/5 backdrop-blur-md transition-transform duration-500 group-hover:translate-y-[-8px]">
                        <div className="flex items-center gap-3 mb-4">
                            <Brain className="text-[#ffb77d] w-8 h-8" />
                            <h3 className="text-3xl font-bold text-[#ebe0da] tracking-tight">Musical Roast (AI)</h3>
                        </div>
                        <p className="text-[#ebe0da]/70 mb-6 max-w-md font-light leading-relaxed">
                            Let AI judge your top tracks with brutal honesty and hilarious insights. No playlist is safe from the digital critic.
                        </p>
                        <Link href="/vibe-lab/roast" className="bg-[#ffb77d] hover:bg-[#ffb77d]/90 text-[#0D0906] font-semibold py-3 px-8 rounded-full transition-all active:scale-95 flex items-center gap-2 group/btn w-fit shadow-lg shadow-[#ffb77d]/20">
                            Try Now
                            <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </>
        )
    },
    {
        id: 'hipster-meter',
        colSpan: 'md:col-span-5',
        height: 'h-[450px]',
        image: '/card-2.png',
        imageClassName: 'object-cover transition-transform duration-700 group-hover:scale-110 opacity-40',
        content: (
            <>
                <div className="absolute inset-0 bg-linear-to-b from-[#0D0906]/80 via-transparent to-[#0D0906]/80 z-10 transition-opacity duration-500 group-hover:opacity-90"></div>
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 rounded-full border border-[#ffb77d]/40 flex items-center justify-center text-[#ffb77d] bg-[#0D0906]/40 backdrop-blur-md shadow-lg">
                            <TrendingDown className="w-6 h-6" />
                        </div>
                        <span className="font-mono text-[10px] sm:text-xs text-[#ffb77d] bg-[#ffb77d]/10 px-3 py-1.5 rounded-full border border-[#ffb77d]/20 tracking-widest backdrop-blur-md">
                            PRECISION METRIC
                        </span>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#1A1412]/60 border border-white/5 backdrop-blur-md transition-transform duration-500 group-hover:translate-y-[-8px]">
                        <h3 className="text-2xl font-bold text-[#ebe0da] mb-2 tracking-tight">Hipster Meter</h3>
                        <p className="text-[#ebe0da]/70 mb-6 text-sm font-light leading-relaxed">
                            Calculate how obscure your taste really is compared to the mainstream.
                        </p>
                        <Link href="/vibe-lab/hipster-meter" className="w-full px-4 bg-white/5 hover:bg-white/10 text-[#ebe0da] font-semibold py-3 rounded-full transition-all active:scale-95 border border-white/10 backdrop-blur-md">
                            Calculate Score
                        </Link>
                    </div>
                </div>
            </>
        )
    },
    {
        id: 'festival-poster',
        colSpan: 'md:col-span-12',
        height: 'h-[350px]',
        image: '/card-3.png',
        imageClassName: 'object-cover opacity-60 transition-transform duration-700 group-hover:scale-105',
        content: (
            <>
                <div className="absolute inset-0 bg-[#0D0906]/60 z-10 group-hover:bg-[#0D0906]/20 transition-colors duration-500"></div>
                <div className="absolute inset-0 z-20 p-8 sm:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl text-center md:text-left transition-transform duration-500 group-hover:translate-x-2">
                        <h3 className="text-4xl md:text-5xl lg:text-5xl font-bold text-[#ebe0da] mb-4 tracking-tighter italic">Festival Poster</h3>
                        <p className="text-lg text-[#ebe0da]/80 font-light leading-relaxed">
                            Turn your listening history into a stunning, viral festival lineup. Personalized typography based on your vibe.
                        </p>
                    </div>
                    <div className="shrink-0 transition-transform duration-500 md:group-hover:-translate-x-2">
                        <Link href="/vibe-lab/festival-poster" className="bg-[#ffb77d] hover:bg-[#ffb77d]/90 text-[#0D0906] font-extrabold py-4 px-10 rounded-full transition-all shadow-xl shadow-[#ffb77d]/20 active:scale-95 text-base sm:text-lg uppercase tracking-widest whitespace-nowrap">
                            Create Poster
                        </Link>
                    </div>
                </div>
            </>
        )
    },
    {
        id: 'vibe-match',
        colSpan: 'md:col-span-6',
        height: 'h-[400px]',
        image: '/card-1.png',
        imageClassName: 'object-cover transition-transform duration-700 group-hover:scale-105 opacity-50',
        content: (
            <>
                <div className="absolute inset-0 bg-linear-to-t from-[#0D0906] via-[#0D0906]/30 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <div className="p-6 rounded-2xl bg-[#1A1412]/60 border border-white/5 backdrop-blur-md transition-transform duration-500 group-hover:translate-y-[-8px]">
                        <div className="flex items-center gap-3 mb-4">
                            <Heart className="text-[#ffb77d] w-8 h-8" />
                            <h3 className="text-3xl font-bold text-[#ebe0da] tracking-tight">Vibe Match</h3>
                        </div>
                        <p className="text-[#ebe0da]/70 mb-6 max-w-md font-light leading-relaxed">
                            Discover your musical compatibility with friends. Compare tastes, find common ground, and generate blended playlists.
                        </p>
                        <Link href="/vibe-lab/vibe-match" className="bg-[#ffb77d] hover:bg-[#ffb77d]/90 text-[#0D0906] font-semibold py-3 px-8 rounded-full transition-all active:scale-95 flex items-center gap-2 group/btn w-fit shadow-lg shadow-[#ffb77d]/20">
                            Find Your Match
                            <ArrowRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </>
        )
    }
];

const page = () => {
    return (
        <main className="mx-auto max-w-7xl py-16 md:py-24 px-4 md:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col items-start gap-4">
                <div className="inline-block px-3 py-1 bg-[#ffb77d]/20 text-[#ffb77d] rounded-full mb-6 border border-[#ffb77d]/20">
                    <span className="text-[10px] uppercase tracking-[0.2em]">Experimental v1.0</span>
                </div>
                <h1 className="text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-none font-bold text-[#ebe0da]">
                    Vibe Lab
                </h1>
                <p className="text-lg text-white/60 max-w-2xl font-light leading-relaxed">
                    your musical laboratory. Experiment with your data,
                    <span className="text-[#ffb77d]"> roast your taste</span>, and visualize your sound.
                </p>
            </div>

            {/* Bento Grid */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 mt-12 sm:mt-16 w-full">
                {VIBE_LAB_CARDS.map((card) => (
                    <div 
                        key={card.id} 
                        className={`group cursor-pointer overflow-hidden rounded-3xl bg-[#1A1412] border border-white/5 relative ${card.colSpan} ${card.height}`}
                    >
                        <Image 
                            src={card.image}
                            alt={card.id.replace('-', ' ')}
                            fill
                            className={card.imageClassName}
                        />
                        {card.content}
                    </div>
                ))}
            </section>
        </main>
    )
}

export default page