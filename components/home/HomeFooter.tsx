const HomeFooter = () => {
  return (
    <footer className="flex justify-center items-center gap-4 py-12 relative z-10">
      <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D97706] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D97706]" />
        </span>
        <span className="text-xs uppercase text-[#FEF3C7] tracking-[0.15em] uppercase font-semibold">
          2.5 million sound dnas analyzed
        </span>
      </div>
    </footer>
  );
};

export default HomeFooter;
