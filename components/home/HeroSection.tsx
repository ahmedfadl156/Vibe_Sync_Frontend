import Link from "next/link"
const API_URL = process.env.NEXT_PUBLIC_API_URL
const HeroSection = () => {
    return (
        <section className="relative z-10 flex flex-col items-center text-center max-w-4xl">
            <h1 className="font-bold tracking-tighter mb-4 text-6xl md:text-9xl">
                <span className="text-[#D97706]">Vibe</span>
                <span className="text-[#FEF3C7]">Sage</span>
            </h1>
            <p className="text-[#A8956A] text-xl md:text-2xl mb-12 tracking-wide font-medium">Uncover your musical identity. Beyond Wrapped</p>
            <div className="flex flex-col sm:flex-row items-center gap-8">
                <Link href="/generate" className="bg-[#D97706] text-[#4d2600] px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform active:scale-95 shadow-[0_10px_30px_rgba(217,119,6,0.2)]">
                    Generate A Playlist
                </Link>
                <Link href="/vibe-lab/roast" className="border-2 border-[#D97706] text-[#D97706] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#D97706]/10 transition-colors active:scale-95">
                    Roast My Taste(AI)
                </Link>
            </div>
        </section>
    )
}

export default HeroSection