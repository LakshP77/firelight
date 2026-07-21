import Legend from "@/components/dashboard/Legend";

export default function MapContainer() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#10161c]">
      <div className="absolute left-5 top-5 z-10 rounded-lg border border-white/10 bg-black/80 p-4">
        <h2 className="font-semibold">
          Firelight Wildfire Risk Visualization
        </h2>

        <p className="mt-2 text-sm text-white/60">
          Currently limited to Washington State
        </p>
      </div>

      <div className="flex h-full min-h-[700px] items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">Interactive Map</p>
          <p className="mt-2 text-sm text-white/50">
            Leaflet map will be added here
          </p>
        </div>
      </div>

      <Legend />
    </div>
  );
}
