import type { LayerVisibility } from "./MapToolbar";

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
];

export default function LayerControlPanel({
  layers,
  onToggleLayer,
}: LayerControlPanelProps) {
  return (
    <section
      aria-label="Map layers"
      className="w-56 rounded-xl border border-white/10 bg-[#0b1015]/95 p-4 shadow-xl backdrop-blur"
    >
      <h3 className="font-semibold text-white">Map Layers</h3>

      <div className="mt-3 space-y-3">
        {layerOptions.map((option) => (
          <label
            key={option.key}
            className="flex cursor-pointer items-center justify-between gap-4 text-sm text-white/70"
          >
            <span>{option.label}</span>
            <input
              type="checkbox"
              checked={layers[option.key]}
              onChange={() => onToggleLayer(option.key)}
              className="h-4 w-4 accent-orange-500"
            />
          </label>
        ))}
      </div>
    </section>
  );
}
