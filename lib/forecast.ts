import type { ForecastWindow } from "@/types/wildfire";

export const FORECAST_OPTIONS: ReadonlyArray<{
  value: ForecastWindow;
  label: string;
  detail: string;
}> = [
  { value: "current", label: "Current", detail: "Current conditions" },
  { value: "6h", label: "+6h", detail: "6-hour forecast" },
  { value: "12h", label: "+12h", detail: "12-hour forecast" },
  { value: "24h", label: "+24h", detail: "24-hour forecast" },
  { value: "48h", label: "+48h", detail: "48-hour forecast" },
];

export function getForecastDetail(window: ForecastWindow) {
  return (
    FORECAST_OPTIONS.find((option) => option.value === window)?.detail ??
    "Current conditions"
  );
}
