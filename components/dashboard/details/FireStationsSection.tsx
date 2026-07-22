import type { FireStationDistance } from "@/types/fireStation";
import { MapPin } from "lucide-react";
import DetailSection from "./DetailSection";

export default function FireStationsSection({ stations }: { stations: FireStationDistance[] }) {
  return <DetailSection title="Nearby Fire Stations"><ol className="space-y-2.5">{stations.map((station, index) => <li key={station.id} className={`flex gap-3 rounded-md border p-3 ${index === 0 ? "border-orange-500/20 bg-orange-500/[0.05]" : "border-white/[0.06] bg-black/10"}`}><MapPin aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${index === 0 ? "text-orange-500" : "text-white/35"}`} /><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><p className="text-xs font-semibold text-white/80">{station.name}</p><span className="shrink-0 text-[11px] text-white/55">{station.distanceToSelectedArea} mi {station.directionFromSelectedArea}</span></div><p className="mt-1 text-[11px] text-white/35">{station.serviceArea}{index === 0 ? " · Nearest" : ""}</p><p className="mt-1 text-[10px] text-white/30">{station.engines} engines · {station.crews} crews</p></div></li>)}</ol><p className="mt-3 text-[10px] text-white/30">Prototype station data; not operationally verified.</p></DetailSection>;
}
