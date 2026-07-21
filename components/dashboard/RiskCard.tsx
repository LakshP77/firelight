export default function RiskPanel() {
  return (
    <aside className="rounded-xl border border-white/10 bg-[#0b1015]">
      <div className="border-b border-white/10 p-6">
        <p className="text-sm text-white/50">Selected Area</p>

        <h2 className="mt-3 text-2xl font-bold">
          Kittitas County, WA
        </h2>

        <p className="mt-1 text-sm text-white/50">
          Lat 47.38° N, Lon 120.58° W
        </p>
      </div>

      <div className="space-y-5 p-6">
        <div className="rounded-xl bg-red-600 p-5">
          <p className="text-2xl font-bold">High Risk</p>
          <p className="mt-1 text-lg">Score: 82 / 100</p>
        </div>

        <section>
          <h3 className="font-semibold">Top Contributing Factors</h3>

          <div className="mt-3 space-y-3 text-sm text-white/70">
            <div className="flex justify-between">
              <span>Low Humidity</span>
              <span>18%</span>
            </div>

            <div className="flex justify-between">
              <span>High Wind Speed</span>
              <span>21 mph</span>
            </div>

            <div className="flex justify-between">
              <span>Dry Vegetation</span>
              <span>86%</span>
            </div>

            <div className="flex justify-between">
              <span>High Temperature</span>
              <span>94°F</span>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 pt-5">
          <h3 className="font-semibold">Current Conditions</h3>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <ConditionCard label="Temperature" value="94°F" />
            <ConditionCard label="Humidity" value="18%" />
            <ConditionCard label="Wind Speed" value="21 mph" />
            <ConditionCard label="Vegetation Dryness" value="86%" />
          </div>
        </section>

        <section className="border-t border-white/10 pt-5">
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-white/50">Last Updated</p>
              <p className="mt-1">Jul 15, 2026 2:30 PM</p>
            </div>

            <div className="text-right">
              <p className="text-white/50">Model Confidence</p>
              <p className="mt-1 font-semibold text-green-400">86%</p>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}

type ConditionCardProps = {
  label: string;
  value: string;
};

function ConditionCard({ label, value }: ConditionCardProps) {
  return (
    <div className="rounded-lg border border-white/10 p-3">
      <p className="text-xs text-white/50">{label}</p>
      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}