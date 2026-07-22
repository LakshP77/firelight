"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { mockLocations } from "@/data/mockLocations";
import type { ForecastWindow, WildfireLocation } from "@/types/wildfire";
import Navbar from "../layout/Navbar";
import Sidebar from "./Sidebar";

const MapContainer = dynamic(() => import("../map/MapContainer"), {
  ssr: false,
});

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] =
    useState<WildfireLocation>(mockLocations[0]);
  const [forecastWindow, setForecastWindow] =
    useState<ForecastWindow>("current");

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
        />
      </section>
    </>
  );
}
