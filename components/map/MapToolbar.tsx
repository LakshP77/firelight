"use client";

import { useEffect } from "react";
import { Bookmark, Clock3, House, Layers3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import LayerControlPanel from "./LayerControlPanel";

type ToolbarItem = {
  label: string;
  icon: LucideIcon;
};

const items: ToolbarItem[] = [
  { label: "Overview", icon: House },
  { label: "Layers", icon: Layers3 },
  { label: "Time", icon: Clock3 },
  { label: "Saved", icon: Bookmark },
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
    <div className="absolute left-4 top-1/2 z-[500] flex -translate-y-1/2 items-center gap-3 sm:left-5">
      <nav
        aria-label="Map tools"
        className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#0a0f14]/95 p-1 shadow-2xl backdrop-blur-md"
      >
        {items.map((item, index) => {
          const Icon = item.icon;
          const isLayersButton = item.label === "Layers";
          const isActive = isLayersButton
            ? isLayersOpen
            : index === 0 && !isLayersOpen;

          return (
            <button
              key={item.label}
              type="button"
              aria-label={item.label}
              aria-expanded={isLayersButton ? isLayersOpen : undefined}
              aria-controls={isLayersButton ? "map-layer-panel" : undefined}
              onClick={isLayersButton ? onToggleLayers : undefined}
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
