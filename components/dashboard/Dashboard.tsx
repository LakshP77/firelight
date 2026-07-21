"use client";

import { useState } from "react";
import { mockLocations } from "@/data/mockLocations";
import type { WildfireLocation } from "@/types/wildfire";
import MapContainer from "../map/MapContainer";
import Sidebar from "./Sidebar";

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] =
    useState<WildfireLocation>(mockLocations[0]);

  return (
    <section className="grid min-h-[calc(100vh-80px)] grid-cols-[minmax(0,1fr)_380px] gap-4 p-4">
      <MapContainer
        locations={mockLocations}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
      />

      <Sidebar location={selectedLocation} />
    </section>
  );
}