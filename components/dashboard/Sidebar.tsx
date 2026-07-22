import type { WildfireLocation } from "@/types/wildfire";
import {
  Building2,
  Droplets,
  Flame,
  Gauge,
  Info,
  Leaf,
  MapPin,
  Thermometer,
  TrendingUp,
  Users,
  Wind,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type SidebarProps = {
  location: WildfireLocation;
};

export default function Sidebar({ location }: SidebarProps) {
  return (
    <aside className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#090e13] shadow-[0_18px_55px_rgba(0,0,0,0.2)]">
      <div className="border-b border-white/[0.08] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
          Selected Area
        </p>

        <h2 className="mt-3 flex items-center gap-2 text-xl font-bold tracking-tight">
          <MapPin aria-hidden="true" className="h-5 w-5 text-orange-500" />
          {location.name}
        </h2>

        <p className="mt-2 pl-7 text-xs text-white/45">
          Lat {location.latitude.toFixed(2)}° N, Lon{" "}
          {Math.abs(location.longitude).toFixed(2)}° W
        </p>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid grid-cols-[minmax(0,1fr)_130px] gap-3">
          <div className="rounded-lg border border-red-400/15 bg-red-600/90 p-4 shadow-[0_10px_30px_rgba(220,38,38,0.12)]">
            <p className="text-2xl font-bold tracking-tight">
              {location.riskLevel} Risk
            </p>
            <p className="mt-1 text-base font-medium">
              Score: {location.riskScore} / 100
            </p>
          </div>

          <div className="rounded-lg border border-white/[0.1] bg-white/[0.02] p-4">
            <p className="text-xs text-white/40">Trend</p>
            <p className="mt-1 flex items-center gap-1.5 font-semibold">
              <TrendingUp aria-hidden="true" className="h-4 w-4 text-red-400" />
              {location.trend}
            </p>
            <p className="mt-2 text-[11px] leading-4 text-white/40">
              {location.predictionWindow}
            </p>
          </div>
        </div>

        <SidebarSection title="Top Contributing Factors">
          <div className="space-y-3 text-sm text-white/65">
            <ConditionRow icon={Droplets} label="Low Humidity" value={`${location.humidity}%`} />
            <ConditionRow icon={Wind} label="High Wind Speed" value={`${location.windSpeed} mph`} />
            <ConditionRow icon={Leaf} label="Dry Vegetation" value={`${location.vegetationDryness}%`} />
            <ConditionRow icon={Thermometer} label="High Temperature" value={`${location.temperature}°F`} />
          </div>
        </SidebarSection>

        <SidebarSection title="Current Conditions" divided>
          <div className="grid grid-cols-6 gap-2.5">
            <ConditionCard className="col-span-2" icon={Thermometer} label="Temperature" value={`${location.temperature}°F`} />
            <ConditionCard className="col-span-2" icon={Droplets} label="Humidity" value={`${location.humidity}%`} />
            <ConditionCard className="col-span-2" icon={Wind} label="Wind Speed" value={`${location.windSpeed} mph`} />
            <ConditionCard className="col-span-3" icon={Gauge} label="Drought Level" value={location.droughtLevel} />
            <ConditionCard className="col-span-3" icon={Leaf} label="Vegetation Dryness" value={`${location.vegetationDryness}%`} />
          </div>
        </SidebarSection>

        <SidebarSection title="Area Context" divided>
          <div className="space-y-3 text-sm text-white/65">
            <ConditionRow icon={Flame} label="Recent Fires (10 yrs)" value={location.recentFires.toString()} />
            <ConditionRow icon={Building2} label="Nearest Fire Station" value={location.nearestFireStation} />
            <ConditionRow icon={Users} label="Population at Risk" value={`~${location.populationAtRisk.toLocaleString()}`} />
          </div>
        </SidebarSection>

        <section className="border-t border-white/[0.08] pt-5">
          <div className="flex justify-between gap-4 text-xs">
            <div>
              <p className="text-white/40">Last Updated</p>
              <p className="mt-1.5 text-white/75">{location.lastUpdated}</p>
            </div>

            <div className="text-right">
              <p className="text-white/40">Model Confidence</p>
              <p className="mt-1.5 font-bold text-green-400">
                {location.modelConfidence}%
              </p>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}

type SidebarSectionProps = {
  title: string;
  divided?: boolean;
  children: React.ReactNode;
};

function SidebarSection({ title, divided, children }: SidebarSectionProps) {
  return (
    <section className={divided ? "border-t border-white/[0.08] pt-5" : undefined}>
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/90">
        {title}
        <Info aria-hidden="true" className="h-3.5 w-3.5 text-white/35" />
      </h3>
      {children}
    </section>
  );
}

type DisplayItemProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
};

function ConditionRow({ icon: Icon, label, value }: DisplayItemProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="flex min-w-0 items-center gap-2">
        <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-white/45" strokeWidth={1.8} />
        <span>{label}</span>
      </span>
      <span className="shrink-0 text-right font-medium text-white/90">{value}</span>
    </div>
  );
}

function ConditionCard({ icon: Icon, label, value, className }: DisplayItemProps) {
  return (
    <div className={`${className ?? ""} rounded-lg border border-white/[0.09] bg-white/[0.015] p-3 transition hover:border-white/[0.16] hover:bg-white/[0.03]`}>
      <p className="flex items-center gap-1.5 text-[11px] text-white/40">
        <Icon aria-hidden="true" className="h-3.5 w-3.5" />
        {label}
      </p>
      <p className="mt-1.5 text-sm font-semibold text-white/90">{value}</p>
    </div>
  );
}
