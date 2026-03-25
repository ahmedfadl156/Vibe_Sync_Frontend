const features = [
  {
    number: "01",
    headline: (
      <>
        One room.<br />All your Spotifys.
      </>
    ),
  },
  {
    number: "02",
    headline: (
      <>
        Pick the vibe.<br />We find the overlap.
      </>
    ),
  },
  {
    number: "03",
    headline: (
      <>
        The playlist builds<br />itself, live.
      </>
    ),
  },
];

const FeatureGrid = () => {
  return (
    <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mt-24">
      {features.map(({ number, headline }) => (
        <div
          key={number}
          className="
            bg-[#1C1408] rounded-[12px] p-8
            flex flex-col justify-between
            aspect-video md:aspect-square
            border border-white/5
            group
            hover:border-[#D97706]/20
            hover:bg-[#211608]
            transition-colors duration-300
          "
        >
          <span className="text-6xl text-[#2A1E08] font-bold leading-none select-none">
            {number}
          </span>
          <h3 className="text-2xl text-[#FEF3C7] font-bold leading-tight">
            {headline}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
