type ToolbarItem = {
  label: string;
  symbol: string;
};

const items: ToolbarItem[] = [
  { label: "Overview", symbol: "⌂" },
  { label: "Layers", symbol: "◇" },
  { label: "Time", symbol: "◷" },
  { label: "Saved", symbol: "▱" },
];

export default function MapToolbar() {
  return (
    <nav className="absolute left-5 top-1/2 z-[500] -translate-y-1/2 overflow-hidden rounded-xl border border-white/10 bg-[#0b1015]/95 shadow-xl backdrop-blur">
      {items.map((item, index) => (
        <button
          key={item.label}
          type="button"
          className={`flex w-[72px] flex-col items-center gap-1 px-3 py-4 text-xs transition ${
            index === 0
              ? "bg-orange-500/10 text-orange-500"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          }`}
        >
          <span className="text-2xl">{item.symbol}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}