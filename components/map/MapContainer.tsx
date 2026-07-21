"use client";

import {
  CircleMarker,
  MapContainer as LeafletMap,
  Popup,
  TileLayer,
} from "react-leaflet";
import type { WildfireLocation } from "@/types/wildfire";

type MapContainerProps = {
  locations: WildfireLocation[];
  selectedLocation: WildfireLocation;
  onSelectLocation: (location: WildfireLocation) => void;
};

function getRiskColor(score: number) {
  if (score >= 76) return "#ef4444";
  if (score >= 51) return "#f97316";
  if (score >= 26) return "#eab308";
  return "#22c55e";
}

export default function MapContainer({
  locations,
  selectedLocation,
  onSelectLocation,
}: MapContainerProps) {
  return (
    <div className="relative min-h-[700px] overflow-hidden rounded-xl border border-white/10 bg-[#10161c]">
      <LeafletMap
        center={[47.4, -120.7]}
        zoom={7}
        minZoom={6}
        className="h-[700px] w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {locations.map((location) => {
          const isSelected = selectedLocation.id === location.id;

          return (
            <CircleMarker
              key={location.id}
              center={[location.latitude, location.longitude]}
              radius={isSelected ? 15 : 11}
              pathOptions={{
                color: "#ffffff",
                weight: isSelected ? 4 : 2,
                fillColor: getRiskColor(location.riskScore),
                fillOpacity: 0.9,
              }}
              eventHandlers={{
                click: () => onSelectLocation(location),
              }}
            >
              <Popup>
                <div>
                  <strong>{location.name}</strong>
                  <br />
                  {location.riskLevel} Risk
                  <br />
                  Score: {location.riskScore}/100
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </LeafletMap>

      <div className="pointer-events-none absolute left-5 top-5 z-[500] rounded-lg border border-white/10 bg-black/80 p-4 backdrop-blur">
        <h2 className="font-semibold">
          Firelight Wildfire Risk Visualization
        </h2>

        <p className="mt-2 text-sm text-white/60">
          Currently limited to Washington State
        </p>
      </div>
    </div>
  );
}