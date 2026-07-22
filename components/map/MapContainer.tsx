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
  ZoomControl,
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
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0f14] shadow-[0_18px_55px_rgba(0,0,0,0.18)]">
      <div className="relative h-[700px]">
        <LeafletMap
          center={[47.4, -120.7]}
          zoom={7}
          minZoom={6}
          zoomControl={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />

          <ZoomControl position="topright" />

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
                  fillOpacity: 0.1,
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
                    className: isSelected
                      ? "risk-marker-selected"
                      : "risk-marker",
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

        <div className="pointer-events-none absolute left-4 top-4 z-[500] max-w-56 rounded-xl border border-white/[0.1] bg-[#080c10]/92 p-4 shadow-2xl backdrop-blur-md sm:left-5 sm:top-5">
          <h2 className="text-sm font-semibold leading-snug tracking-tight">
            Firelight Wildfire Risk Visualization
          </h2>

          <p className="mt-2 text-xs leading-5 text-white/50">
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
