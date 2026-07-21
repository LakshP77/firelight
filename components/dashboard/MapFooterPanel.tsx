const riskLevels = [
  { label: "Low", range: "0–25", color: "#22c55e" },
  { label: "Moderate", range: "26–50", color: "#eab308" },
  { label: "High", range: "51–75", color: "#f97316" },
  { label: "Extreme", range: "76–100", color: "#ef4444" },
];

export default function MapFooterPanel() {
  return (
    <div className="grid gap-6 border-t border-white/10 bg-[#0b1015] p-5 lg:grid-cols-[1fr_1fr_1.3fr]">
      <section>
        <h3 className="text-sm font-semibold">Risk Level Legend</h3>

        <div className="mt-3 space-y-2">
          {riskLevels.map((level) => (
            <div
              key={level.label}
              className="flex items-center gap-3 text-sm text-white/70"
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: level.color }}
              />
              <span>
                {level.label} ({level.range})
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-white/10 lg:border-l lg:pl-6">
        <h3 className="text-sm font-semibold">Data Sources</h3>

        <p className="mt-3 text-sm leading-6 text-white/60">
          NWS · USGS · NASA FIRMS
          <br />
          NOAA · WA DNR · Others
        </p>

        <button
          type="button"
          className="mt-3 text-sm text-orange-500 underline-offset-4 hover:underline"
        >
          Learn more
        </button>
      </section>

      <section className="rounded-lg border border-blue-400/15 bg-blue-400/5 p-4">
        <p className="text-sm leading-6 text-blue-200/80">
          This tool is for informational purposes only and is not an official
          alert system. Always follow guidance from local authorities.
        </p>
      </section>
    </div>
  );
}