"use client";

import { useEffect } from "react";
import { Bookmark, Clock3, House, Layers3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ForecastWindow } from "@/types/wildfire";
import ForecastControlPanel from "./ForecastControlPanel";
import LayerControlPanel from "./LayerControlPanel";

type ToolbarItem = {
  id: "overview" | "layers" | "time" | "saved";
  label: string;
  icon: LucideIcon;
};

const items: ToolbarItem[] = [
  { id: "overview", label: "Overview", icon: House },
  { id: "layers", label: "Layers", icon: Layers3 },
  { id: "time", label: "Time", icon: Clock3 },
  { id: "saved", label: "Saved", icon: Bookmark },
];

export type LayerVisibility = {
  riskMarkers: boolean;
  riskRadius: boolean;
  historicalFires: boolean;
  weatherConditions: boolean;
};

export type MapToolbarPanel = "layers" | "time" | null;

type MapToolbarProps = {
  activePanel: MapToolbarPanel;
  layers: LayerVisibility;
  forecastWindow: ForecastWindow;
  onTogglePanel: (panel: Exclude<MapToolbarPanel, null>) => void;
  onToggleLayer: (layer: keyof LayerVisibility) => void;
  onChangeForecast: (window: ForecastWindow) => void;
  onClosePanel: () => void;
};

export default function MapToolbar({
  activePanel,
  layers,
  forecastWindow,
  onTogglePanel,
  onToggleLayer,
  onChangeForecast,
  onClosePanel,
}: MapToolbarProps) {
  useEffect(() => {
    if (!activePanel) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClosePanel();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activePanel, onClosePanel]);

  return (
    <div className="absolute left-4 top-1/2 z-[500] flex -translate-y-1/2 items-center gap-3 sm:left-5">
      <nav
        aria-label="Map tools"
        className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#0a0f14]/95 p-1 shadow-2xl backdrop-blur-md"
      >
        {items.map((item) => {
          const Icon = item.icon;
          const panelId =
            item.id === "layers" || item.id === "time" ? item.id : null;
          const isActive =
            item.id === activePanel || (item.id === "overview" && !activePanel);

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-expanded={panelId ? panelId === activePanel : undefined}
              aria-controls={panelId ? `map-${panelId}-panel` : undefined}
              onClick={panelId ? () => onTogglePanel(panelId) : undefined}
              className={`flex w-[64px] flex-col items-center gap-1.5 rounded-lg px-2 py-3 text-[11px] font-medium transition focus-visible:outline-2 focus-visible:outline-orange-500 ${
                isActive
                  ? "bg-orange-500/10 text-orange-500"
                  : "text-white/50 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {activePanel === "layers" && (
        <div id="map-layers-panel">
          <LayerControlPanel layers={layers} onToggleLayer={onToggleLayer} />
        </div>
      )}

      {activePanel === "time" && (
        <div id="map-time-panel">
          <ForecastControlPanel
            forecastWindow={forecastWindow}
            onChangeForecast={onChangeForecast}
          />
        </div>
      )}
    </div>
  );
}
