import { historicalFires } from "@/data/historicalFires";
import DetailSection from "./DetailSection";

export default function HistoricalFiresSection({ locationId }: { locationId: string }) {
  const fires = historicalFires.filter((fire) => fire.locationId === locationId);

  return (
    <DetailSection title="Historical Fires">
      {fires.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-white/35">
              <tr><th className="pb-2 font-medium">Fire</th><th className="pb-2 font-medium">Year</th><th className="pb-2 text-right font-medium">Acres</th><th className="pb-2 text-right font-medium">Cause</th></tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-white/70">
              {fires.map((fire) => (
                <tr key={fire.id}>
                  <td className="py-2.5 pr-2 font-medium text-white/85">{fire.name}</td>
                  <td className="py-2.5 pr-2">{fire.year}</td>
                  <td className="py-2.5 text-right">{fire.acresBurned?.toLocaleString() ?? "—"}</td>
                  <td className="py-2.5 pl-2 text-right">{fire.cause ?? "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <p className="text-xs text-white/45">No historical fire records are included in this prototype.</p>}
      <p className="mt-2 text-[10px] text-white/30">Historical entries are mock prototype data.</p>
    </DetailSection>
  );
}
