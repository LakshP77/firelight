import { CloudRain, Flame, Leaf, Map, Mountain, Users } from "lucide-react";
import StatisticCard from "@/components/ui/StatisticCard";
import type { CountyStatistics } from "@/types/countyDetails";
import { formatElevation, formatLandArea, formatPopulation, formatRainfall, formatRecentFires, formatText } from "@/utils/formatCountyStatistic";
import DetailSection from "./DetailSection";

export default function CountyStatisticsSection({ statistics }: { statistics: CountyStatistics | null }) {
  return (
    <DetailSection title="County Statistics">
      <dl className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        <StatisticCard icon={Users} label="Population" value={formatPopulation(statistics?.population)} />
        <StatisticCard icon={Map} label="Land area" value={formatLandArea(statistics?.landAreaSquareMiles)} />
        <StatisticCard icon={Flame} label="Recent fires" value={formatRecentFires(statistics?.recentFires)} />
        <StatisticCard icon={Mountain} label="Average elevation" value={formatElevation(statistics?.averageElevationFeet)} />
        <StatisticCard icon={CloudRain} label="Average annual rainfall" value={formatRainfall(statistics?.averageAnnualRainfallInches)} />
        <StatisticCard icon={Leaf} label="Dominant vegetation" value={formatText(statistics?.dominantVegetation)} className="col-span-2" />
      </dl>
      <p className="mt-3 text-[10px] text-white/30">County statistics are sample prototype values and are not authoritative agency data.</p>
    </DetailSection>
  );
}
