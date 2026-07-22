"use client";

import { useCallback, useEffect, useState } from "react";
import type { WildfireLocation } from "@/types/wildfire";
import MapFooterPanel from "@/components/dashboard/MapFooterPanel";
import { historicalFires } from "@/data/historicalFires";
import {
  Circle,
  CircleMarker,
  MapContainer as LeafletMap,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import HistoricalFireLayer from "./HistoricalFireLayer";
import MapToolbar from "./MapToolbar";
import type { LayerVisibility } from "./MapToolbar";
import WeatherLabelLayer from "./WeatherLabelLayer";

type MapContainerProps = {
  locations: WildfireLocation[];
  selectedLocation: WildfireLocation;
  onSelectLocation: (location: WildfireLocation) => void;
};

function getRiskColor(score: number) {
  if (score >= 76) {
    return "#ef4444";
  }

  if (score >= 51) {
    return "#f97316";
  }

  if (score >= 26) {
    return "#eab308";
  }

  return "#22c55e";
}

function FlyToSelectedLocation({
  location,
}: {
  location: WildfireLocation;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([location.latitude, location.longitude], 9, {
      animate: true,
    });
  }, [location, map]);

  return null;
}

export default function MapContainer({
  locations,
  selectedLocation,
  onSelectLocation,
}: MapContainerProps) {
  const [isLayersOpen, setIsLayersOpen] = useState(false);
  const [layers, setLayers] = useState<LayerVisibility>({
    riskMarkers: true,
    riskRadius: true,
    historicalFires: false,
    weatherConditions: false,
  });

  const closeLayers = useCallback(() => setIsLayersOpen(false), []);

  function toggleLayer(layer: keyof LayerVisibility) {
    setLayers((currentLayers) => ({
      ...currentLayers,
      [layer]: !currentLayers[layer],
    }));
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#10161c]">
      <div className="relative h-[700px]">
        <LeafletMap
          center={[47.4, -120.7]}
          zoom={7}
          minZoom={6}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <FlyToSelectedLocation location={selectedLocation} />

          {layers.riskRadius &&
            locations.map((location) => (
              <Circle
                key={location.id}
                center={[location.latitude, location.longitude]}
                radius={location.riskScore * 250}
                interactive={false}
                pathOptions={{
                  color: getRiskColor(location.riskScore),
                  weight: 1,
                  opacity: 0.35,
                  fillColor: getRiskColor(location.riskScore),
                  fillOpacity: 0.08,
                }}
              />
            ))}

          {layers.riskMarkers &&
            locations.map((location) => {
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

          {layers.historicalFires && (
            <HistoricalFireLayer fires={historicalFires} />
          )}

          {layers.weatherConditions && (
            <WeatherLabelLayer locations={locations} />
          )}
        </LeafletMap>

        <div className="pointer-events-none absolute left-5 top-5 z-[500] rounded-lg border border-white/10 bg-black/80 p-4 backdrop-blur">
          <h2 className="font-semibold">
            Firelight Wildfire Risk Visualization
          </h2>

          <p className="mt-2 text-sm text-white/60">
            Currently limited to Washington State
          </p>
        </div>

        <MapToolbar
          isLayersOpen={isLayersOpen}
          layers={layers}
          onToggleLayers={() => setIsLayersOpen((isOpen) => !isOpen)}
          onToggleLayer={toggleLayer}
          onCloseLayers={closeLayers}
        />
      </div>

      <MapFooterPanel />
    </div>
  );
}
