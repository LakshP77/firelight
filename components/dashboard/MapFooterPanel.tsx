import { ExternalLink, Info } from "lucide-react";

const riskLevels = [
  { label: "Low", range: "0–25", color: "#22c55e" },
  { label: "Moderate", range: "26–50", color: "#eab308" },
  { label: "High", range: "51–75", color: "#f97316" },
  { label: "Extreme", range: "76–100", color: "#ef4444" },
];

export default function MapFooterPanel() {
  return (
    <div className="grid gap-5 border-t border-white/[0.08] bg-[#090e13] p-5 md:grid-cols-2 lg:grid-cols-[0.9fr_1fr_1.35fr]">
      <section>
        <h3 className="text-sm font-semibold text-white/90">Risk Level Legend</h3>

        <div className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2 lg:grid-cols-1">
          {riskLevels.map((level) => (
            <div key={level.label} className="flex items-center gap-3 text-xs text-white/60">
              <span
                aria-hidden="true"
                className="h-3 w-3 shrink-0 rounded-full ring-2 ring-white/[0.04]"
                style={{ backgroundColor: level.color }}
              />
              <span>
                {level.label} ({level.range})
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border-white/[0.08] lg:border-l lg:pl-6">
        <h3 className="text-sm font-semibold text-white/90">Data Sources</h3>

        <p className="mt-3 text-xs leading-6 text-white/50">
          NWS · USGS · NASA FIRMS
          <br />
          NOAA · WA DNR · Others
        </p>

        <button
          type="button"
          className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-orange-500 underline-offset-4 transition hover:text-orange-400 hover:underline focus-visible:outline-2 focus-visible:outline-orange-500"
        >
          Learn more
          <ExternalLink aria-hidden="true" className="h-3 w-3" />
        </button>
      </section>

      <section className="flex items-start gap-3 rounded-lg border border-blue-400/15 bg-blue-400/[0.04] p-4 md:col-span-2 lg:col-span-1">
        <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
        <p className="text-xs leading-5 text-blue-100/65">
          This tool is for informational purposes only and is not an official
          alert system. Always follow guidance from local authorities.
        </p>
      </section>
    </div>
  );
}
