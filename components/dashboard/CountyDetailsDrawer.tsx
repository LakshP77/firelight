"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { getCountyDetails } from "@/services/countyService";
import { getForecastDetail } from "@/lib/forecast";
import type { ForecastWindow, WildfireLocation } from "@/types/wildfire";
import { getFireStationsForLocation } from "@/services/fireStationService";
import CountyStatisticsSection from "./details/CountyStatisticsSection";
import FireStationsSection from "./details/FireStationsSection";
import HistoricalFiresSection from "./details/HistoricalFiresSection";
import OperationalNotesSection from "./details/OperationalNotesSection";
import PredictionTimelineSection from "./details/PredictionTimelineSection";
import WeatherHistorySection from "./details/WeatherHistorySection";

type CountyDetailsDrawerProps = {
  isOpen: boolean;
  location: WildfireLocation;
  forecastWindow: ForecastWindow;
  onChangeForecast: (window: ForecastWindow) => void;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE_SELECTOR = "button:not([disabled]), textarea:not([disabled]), [href], [tabindex]:not([tabindex='-1'])";

export default function CountyDetailsDrawer({ isOpen, location, forecastWindow, onChangeForecast, onClose, triggerRef }: CountyDetailsDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const forecast = location.forecasts[forecastWindow];
  const details = getCountyDetails(location.id);
  const nearbyStations = getFireStationsForLocation(location);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = triggerRef.current;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => drawerRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR)?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable.at(-1)!;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9000]">
      <div aria-hidden="true" onMouseDown={onClose} className="absolute inset-0 z-[9000] bg-black/65 motion-safe:animate-[drawer-fade-in_180ms_ease-out]" />
      <aside ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby="county-details-title" className="absolute inset-y-0 right-0 z-[9010] flex w-full max-w-[580px] flex-col border-l border-white/[0.1] bg-[#080d12] shadow-[-24px_0_70px_rgba(0,0,0,0.5)] motion-safe:animate-[drawer-slide-in_200ms_ease-out]">
        <header className="shrink-0 border-b border-white/[0.08] bg-[#080d12]/95 px-5 py-4 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-orange-500/80">County Summary</p>
              <h2 id="county-details-title" className="mt-1 truncate text-xl font-bold tracking-tight text-white">{location.name}</h2>
              <p className="mt-1 text-[11px] text-white/40">Lat {location.latitude.toFixed(2)}° N, Lon {Math.abs(location.longitude).toFixed(2)}° W</p>
            </div>
            <button type="button" onClick={onClose} aria-label="Close county details" className="rounded-md border border-white/[0.08] p-2 text-white/45 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-2 focus-visible:outline-orange-500"><X aria-hidden="true" className="h-4 w-4" /></button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <HeaderMetric label="Risk" value={`${forecast.riskLevel} · ${forecast.riskScore}/100`} emphasized />
            <HeaderMetric label="Forecast" value={getForecastDetail(forecastWindow)} />
            <HeaderMetric label="Confidence" value={`${forecast.modelConfidence}%`} />
            <HeaderMetric label="Last updated" value={location.lastUpdated} />
          </div>
        </header>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overflow-x-hidden p-4 sm:p-6">
          {details ? <>
            <HistoricalFiresSection locationId={location.id} />
            <CountyStatisticsSection statistics={details.statistics} />
            <FireStationsSection stations={nearbyStations} />
            <WeatherHistorySection points={details.weatherHistory} />
          </> : <><CountyStatisticsSection statistics={null} /><p className="rounded-lg border border-white/[0.08] p-4 text-xs text-white/45">Additional county context is not available for this location.</p></>}
          <PredictionTimelineSection location={location} forecastWindow={forecastWindow} onChangeForecast={onChangeForecast} />
          <OperationalNotesSection locationId={location.id} />
        </div>
      </aside>
    </div>,
    document.body,
  );
}

function HeaderMetric({ label, value, emphasized = false }: { label: string; value: string; emphasized?: boolean }) {
  return <div className={`min-w-0 rounded-md border p-2.5 ${emphasized ? "border-red-500/20 bg-red-500/[0.08]" : "border-white/[0.07] bg-white/[0.02]"}`}><p className="text-[9px] uppercase tracking-wide text-white/30">{label}</p><p className="mt-1 break-words text-[11px] font-semibold leading-4 text-white/75">{value}</p></div>;
}
