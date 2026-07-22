"use client";

import { useCallback, useEffect, useState } from "react";
import type { ForecastWindow, WildfireLocation } from "@/types/wildfire";
import MapFooterPanel from "@/components/dashboard/MapFooterPanel";
import { historicalFires } from "@/data/historicalFires";
import { getRiskColor } from "@/lib/risk";
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
import type {
  LayerVisibility,
  MapToolbarPanel,
} from "./MapToolbar";
import WeatherLabelLayer from "./WeatherLabelLayer";

type MapContainerProps = {
  locations: WildfireLocation[];
  selectedLocation: WildfireLocation;
  forecastWindow: ForecastWindow;
  onSelectLocation: (location: WildfireLocation) => void;
  onChangeForecast: (window: ForecastWindow) => void;
};

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
  forecastWindow,
  onSelectLocation,
  onChangeForecast,
}: MapContainerProps) {
  const [activePanel, setActivePanel] = useState<MapToolbarPanel>(null);
  const [layers, setLayers] = useState<LayerVisibility>({
    riskMarkers: true,
    riskRadius: true,
    historicalFires: false,
    weatherConditions: false,
  });

  const closePanel = useCallback(() => setActivePanel(null), []);

  function toggleLayer(layer: keyof LayerVisibility) {
    setLayers((currentLayers) => ({
      ...currentLayers,
      [layer]: !currentLayers[layer],
    }));
  }

  function togglePanel(panel: Exclude<MapToolbarPanel, null>) {
    setActivePanel((currentPanel) =>
      currentPanel === panel ? null : panel,
    );
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
            locations.map((location) => {
              const forecast = location.forecasts[forecastWindow];

              return (
                <Circle
                  key={location.id}
                  center={[location.latitude, location.longitude]}
                  radius={forecast.riskScore * 250}
                  interactive={false}
                  pathOptions={{
                    color: getRiskColor(forecast.riskScore),
                    weight: 1,
                    opacity: 0.35,
                    fillColor: getRiskColor(forecast.riskScore),
                    fillOpacity: 0.1,
                    className: "risk-radius",
                  }}
                />
              );
            })}

          {layers.riskMarkers &&
            locations.map((location) => {
              const isSelected = selectedLocation.id === location.id;
              const forecast = location.forecasts[forecastWindow];

              return (
                <CircleMarker
                  key={location.id}
                  center={[location.latitude, location.longitude]}
                  radius={isSelected ? 15 : 11}
                  pathOptions={{
                    color: "#ffffff",
                    weight: isSelected ? 4 : 2,
                    fillColor: getRiskColor(forecast.riskScore),
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
                      {forecast.riskLevel} Risk
                      <br />
                      Score: {forecast.riskScore}/100
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}

          {layers.historicalFires && (
            <HistoricalFireLayer fires={historicalFires} />
          )}

          {layers.weatherConditions && (
            <WeatherLabelLayer
              locations={locations}
              forecastWindow={forecastWindow}
            />
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
          activePanel={activePanel}
          layers={layers}
          forecastWindow={forecastWindow}
          onTogglePanel={togglePanel}
          onToggleLayer={toggleLayer}
          onChangeForecast={onChangeForecast}
          onClosePanel={closePanel}
        />
      </div>

      <MapFooterPanel />
    </div>
  );
}
