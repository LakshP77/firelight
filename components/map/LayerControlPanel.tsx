import type { LayerVisibility } from "./MapToolbar";
import { Layers3 } from "lucide-react";

type LayerControlPanelProps = {
  layers: LayerVisibility;
  onToggleLayer: (layer: keyof LayerVisibility) => void;
};

const layerOptions: Array<{
  key: keyof LayerVisibility;
  label: string;
}> = [
  { key: "riskMarkers", label: "Risk markers" },
  { key: "riskRadius", label: "Risk radius" },
  { key: "historicalFires", label: "Historical fires" },
  { key: "weatherConditions", label: "Weather conditions" },
  { key: "fireStations", label: "Fire stations" },
];

export default function LayerControlPanel({
  layers,
  onToggleLayer,
}: LayerControlPanelProps) {
  return (
    <section
      aria-label="Map layers"
      className="w-60 rounded-xl border border-white/[0.1] bg-[#0a0f14]/95 p-4 shadow-2xl backdrop-blur-md"
    >
      <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
        <Layers3 aria-hidden="true" className="h-4 w-4 text-orange-500" />
        Map Layers
      </h3>

      <div className="mt-3 space-y-3">
        {layerOptions.map((option) => (
          <label
            key={option.key}
            className="flex cursor-pointer items-center justify-between gap-4 rounded-md px-1 py-1 text-sm text-white/65 transition hover:text-white"
          >
            <span>{option.label}</span>
            <input
              type="checkbox"
              checked={layers[option.key]}
              onChange={() => onToggleLayer(option.key)}
              className="h-4 w-4 rounded accent-orange-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
            />
          </label>
        ))}
      </div>
    </section>
  );
}
