import FeatureGrid from "@/components/home/FeatureGrid";
import HomeFooter from "@/components/home/HomeFooter";
import HeroSection from "@/components/home/HeroSection";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden">
      {/* Analog grain overlay */}
      <div className="analog-grain" />

      {/* Background waveform */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none waveform-container">
        <svg className="w-[120%] h-[500px]" preserveAspectRatio="none" viewBox="0 0 1000 300">
          <path d="M0,150 Q125,50 250,150 T500,150 T750,150 T1000,150" fill="none" opacity="0.6" stroke="#D97706" strokeWidth="4" />
          <path d="M0,160 Q125,260 250,160 T500,160 T750,160 T1000,160" fill="none" opacity="0.5" stroke="#C2410C" strokeWidth="4" />
          <path d="M0,140 Q150,100 300,140 T600,140 T900,140 T1200,140" fill="none" opacity="0.4" stroke="#4D7C5F" strokeWidth="4" />
        </svg>
      </div>

      {/* Hero */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-16">
        <HeroSection />
        <FeatureGrid />
      </main>

      {/* Footer */}
      <HomeFooter />
    </div>
  );
}
