import { Flame, Map, Mountain, Users } from "lucide-react";
import { getCountyStatistics } from "@/services/countyService";
import { formatElevation, formatLandArea, formatPopulation, formatRecentFires } from "@/utils/formatCountyStatistic";
import StatisticCard from "@/components/ui/StatisticCard";

export default function CountySnapshot({ locationId }: { locationId: string }) {
  const statistics = getCountyStatistics(locationId);

  return (
    <section aria-labelledby="county-snapshot-title" className="border-t border-white/[0.08] pt-5">
      <h3 id="county-snapshot-title" className="mb-3 text-sm font-semibold text-white/90">County Snapshot</h3>
      <dl className="grid grid-cols-2 gap-2.5">
        <StatisticCard icon={Users} label="Population" value={formatPopulation(statistics?.population)} />
        <StatisticCard icon={Map} label="Land area" value={formatLandArea(statistics?.landAreaSquareMiles)} />
        <StatisticCard icon={Flame} label="Recent fires" value={formatRecentFires(statistics?.recentFires)} />
        <StatisticCard icon={Mountain} label="Avg. elevation" value={formatElevation(statistics?.averageElevationFeet)} />
      </dl>
      <p className="mt-2 text-[10px] text-white/30">Sample county context for this prototype.</p>
    </section>
  );
}
