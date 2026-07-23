import type { LucideIcon } from "lucide-react";

type StatisticCardProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
};

export default function StatisticCard({ icon: Icon, label, value, className = "" }: StatisticCardProps) {
  return (
    <div className={`min-w-0 rounded-md border border-white/[0.07] bg-black/10 p-3 ${className}`}>
      <dt className="flex items-center gap-1.5 text-[10px] text-white/35">
        <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-orange-500/60" strokeWidth={1.8} />
        <span>{label}</span>
      </dt>
      <dd className="mt-1.5 break-words text-xs font-semibold leading-4 text-white/80">{value}</dd>
    </div>
  );
}
