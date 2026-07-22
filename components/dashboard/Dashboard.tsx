"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { mockLocations } from "@/data/mockLocations";
import type { ForecastWindow, WildfireLocation } from "@/types/wildfire";
import Navbar from "../layout/Navbar";
import Sidebar from "./Sidebar";
import CountyDetailsDrawer from "./CountyDetailsDrawer";

const MapContainer = dynamic(() => import("../map/MapContainer"), {
  ssr: false,
});

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] =
    useState<WildfireLocation>(mockLocations[0]);
  const [forecastWindow, setForecastWindow] =
    useState<ForecastWindow>("current");
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const detailsTriggerRef = useRef<HTMLButtonElement>(null);
  const closeDetails = useCallback(() => setIsDetailsOpen(false), []);

  return (
    <>
      <Navbar
        locations={mockLocations}
        onSelectLocation={setSelectedLocation}
      />

      <section className="grid min-h-[calc(100vh-80px)] grid-cols-1 gap-3 p-3 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-4 xl:p-4">
        <MapContainer
          locations={mockLocations}
          selectedLocation={selectedLocation}
          forecastWindow={forecastWindow}
          onSelectLocation={setSelectedLocation}
          onChangeForecast={setForecastWindow}
        />

        <Sidebar
          location={selectedLocation}
          forecastWindow={forecastWindow}
          onChangeForecast={setForecastWindow}
          onOpenDetails={() => setIsDetailsOpen(true)}
          detailsTriggerRef={detailsTriggerRef}
        />
      </section>

      <CountyDetailsDrawer
        isOpen={isDetailsOpen}
        location={selectedLocation}
        forecastWindow={forecastWindow}
        onChangeForecast={setForecastWindow}
        onClose={closeDetails}
        triggerRef={detailsTriggerRef}
      />
    </>
  );
}
