import type { WildfireLocation } from "@/types/wildfire";

type SidebarProps = {
  location: WildfireLocation;
};

export default function Sidebar({ location }: SidebarProps) {
  return (
    <aside className="overflow-hidden rounded-xl border border-white/10 bg-[#0b1015]">
      <div className="border-b border-white/10 p-5">
        <p className="text-sm text-white/50">Selected Area</p>

        <h2 className="mt-3 text-xl font-bold">{location.name}</h2>

        <p className="mt-1 text-sm text-white/50">
          Lat {location.latitude.toFixed(2)}° N, Lon{" "}
          {Math.abs(location.longitude).toFixed(2)}° W
        </p>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid grid-cols-[1fr_130px] gap-3">
          <div className="rounded-lg bg-red-600 p-4">
            <p className="text-xl font-bold">
              {location.riskLevel} Risk
            </p>
            <p className="mt-1">Score: {location.riskScore} / 100</p>
          </div>

          <div className="rounded-lg border border-white/10 p-4">
            <p className="text-sm text-white/50">Trend</p>
            <p className="mt-1 font-semibold">{location.trend}</p>
            <p className="mt-2 text-xs text-white/50">
              {location.predictionWindow}
            </p>
          </div>
        </div>

        <section>
          <h3 className="font-semibold">Top Contributing Factors</h3>

          <div className="mt-3 space-y-3 text-sm text-white/70">
            <ConditionRow label="Low Humidity" value={`${location.humidity}%`} />
            <ConditionRow
              label="High Wind Speed"
              value={`${location.windSpeed} mph`}
            />
            <ConditionRow
              label="Dry Vegetation"
              value={`${location.vegetationDryness}%`}
            />
            <ConditionRow
              label="High Temperature"
              value={`${location.temperature}°F`}
            />
          </div>
        </section>

        <section className="border-t border-white/10 pt-5">
          <h3 className="font-semibold">Current Conditions</h3>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <ConditionCard
              label="Temperature"
              value={`${location.temperature}°F`}
            />
            <ConditionCard
              label="Humidity"
              value={`${location.humidity}%`}
            />
            <ConditionCard
              label="Wind Speed"
              value={`${location.windSpeed} mph`}
            />
            <ConditionCard
              label="Vegetation Dryness"
              value={`${location.vegetationDryness}%`}
            />
            <ConditionCard
              label="Drought Level"
              value={location.droughtLevel}
            />
          </div>
        </section>

        <section className="border-t border-white/10 pt-5">
          <h3 className="font-semibold">Area Context</h3>

          <div className="mt-3 space-y-3 text-sm text-white/70">
            <ConditionRow
              label="Recent Fires (10 yrs)"
              value={location.recentFires.toString()}
            />
            <ConditionRow
              label="Nearest Fire Station"
              value={location.nearestFireStation}
            />
            <ConditionRow
              label="Population at Risk"
              value={`~${location.populationAtRisk.toLocaleString()}`}
            />
          </div>
        </section>

        <section className="border-t border-white/10 pt-5">
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-white/50">Last Updated</p>
              <p className="mt-1">{location.lastUpdated}</p>
            </div>

            <div className="text-right">
              <p className="text-white/50">Model Confidence</p>
              <p className="mt-1 font-semibold text-green-400">
                {location.modelConfidence}%
              </p>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}

type DisplayItemProps = {
  label: string;
  value: string;
};

function ConditionRow({ label, value }: DisplayItemProps) {
  return (
    <div className="flex justify-between gap-4">
      <span>{label}</span>
      <span className="text-right text-white">{value}</span>
    </div>
  );
}

function ConditionCard({ label, value }: DisplayItemProps) {
  return (
    <div className="rounded-lg border border-white/10 p-3">
      <p className="text-xs text-white/50">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}