import type { CountyStatistics } from "@/types/countyDetails";
import DetailSection from "./DetailSection";

export default function CountyStatisticsSection({ statistics }: { statistics: CountyStatistics }) {
  const items = [
    ["Population", statistics.population.toLocaleString()],
    ["Land area", `${statistics.landAreaSquareMiles.toLocaleString()} sq mi`],
    ["Recent fires", statistics.recentFires.toString()],
    ["Dominant vegetation", statistics.dominantVegetation],
    ["Average elevation", `${statistics.averageElevationFeet.toLocaleString()} ft`],
    ["Annual precipitation", `${statistics.annualPrecipitationInches} in`],
  ];

  return <DetailSection title="County Statistics"><dl className="grid grid-cols-2 gap-x-4 gap-y-3">{items.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-[11px] text-white/35">{label}</dt><dd className="mt-1 text-xs font-medium text-white/75">{value}</dd></div>)}</dl><p className="mt-3 text-[10px] text-white/30">County statistics are mock prototype values.</p></DetailSection>;
}
