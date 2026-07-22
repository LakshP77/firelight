"use client";

import { useEffect } from "react";
import LayerControlPanel from "./LayerControlPanel";

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

export type LayerVisibility = {
  riskMarkers: boolean;
  riskRadius: boolean;
  historicalFires: boolean;
  weatherConditions: boolean;
};

type MapToolbarProps = {
  isLayersOpen: boolean;
  layers: LayerVisibility;
  onToggleLayers: () => void;
  onToggleLayer: (layer: keyof LayerVisibility) => void;
  onCloseLayers: () => void;
};

export default function MapToolbar({
  isLayersOpen,
  layers,
  onToggleLayers,
  onToggleLayer,
  onCloseLayers,
}: MapToolbarProps) {
  useEffect(() => {
    if (!isLayersOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCloseLayers();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLayersOpen, onCloseLayers]);

  return (
    <div className="absolute left-5 top-1/2 z-[500] flex -translate-y-1/2 items-center gap-3">
      <nav className="overflow-hidden rounded-xl border border-white/10 bg-[#0b1015]/95 shadow-xl backdrop-blur">
        {items.map((item, index) => {
          const isLayersButton = item.label === "Layers";
          const isActive = isLayersButton ? isLayersOpen : index === 0 && !isLayersOpen;

          return (
            <button
              key={item.label}
              type="button"
              aria-expanded={isLayersButton ? isLayersOpen : undefined}
              aria-controls={isLayersButton ? "map-layer-panel" : undefined}
              onClick={isLayersButton ? onToggleLayers : undefined}
              className={`flex w-[72px] flex-col items-center gap-1 px-3 py-4 text-xs transition ${
                isActive
                  ? "bg-orange-500/10 text-orange-500"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="text-2xl">{item.symbol}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {isLayersOpen && (
        <div id="map-layer-panel">
          <LayerControlPanel
            layers={layers}
            onToggleLayer={onToggleLayer}
          />
        </div>
      )}
    </div>
  );
}
