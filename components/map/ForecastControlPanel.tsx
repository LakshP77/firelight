import { Clock3 } from "lucide-react";
import { FORECAST_OPTIONS } from "@/lib/forecast";
import type { ForecastWindow } from "@/types/wildfire";

type ForecastControlPanelProps = {
  forecastWindow: ForecastWindow;
  onChangeForecast: (window: ForecastWindow) => void;
};

export default function ForecastControlPanel({
  forecastWindow,
  onChangeForecast,
}: ForecastControlPanelProps) {
  return (
    <section
      aria-label="Forecast time"
      className="w-[340px] max-w-[calc(100vw-7rem)] rounded-xl border border-white/[0.1] bg-[#0a0f14]/95 p-4 shadow-2xl backdrop-blur-md"
    >
      <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
        <Clock3 aria-hidden="true" className="h-4 w-4 text-orange-500" />
        Forecast Time
      </h3>

      <div
        role="radiogroup"
        aria-label="Forecast window"
        className="mt-3 grid w-full grid-cols-5 gap-1.5 rounded-lg border border-white/[0.08] bg-black/20 p-1.5"
      >
        {FORECAST_OPTIONS.map((option) => {
          const isSelected = option.value === forecastWindow;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChangeForecast(option.value)}
              className={`min-w-0 overflow-hidden whitespace-nowrap rounded-md px-2.5 py-2.5 text-center text-[11px] font-medium transition focus-visible:outline-2 focus-visible:outline-orange-500 ${
                isSelected
                  ? "bg-orange-500/15 text-orange-400"
                  : "text-white/45 hover:bg-white/[0.05] hover:text-white/80"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-white/40">
        {FORECAST_OPTIONS.find((option) => option.value === forecastWindow)?.detail}
      </p>
    </section>
  );
}
