"use client";

import { useMemo, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { Droplets, Navigation, Thermometer, Wind } from "lucide-react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import type { ForecastWindow, WildfireLocation } from "@/types/wildfire";

type WeatherOverlayProps = {
  locations: WildfireLocation[];
  selectedLocation: WildfireLocation;
  forecastWindow: ForecastWindow;
};

const MINIMUM_WEATHER_ZOOM = 7;
const DIRECTIONS = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];
const DIRECTION_ABBREVIATIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

function getWindDirection(degrees: number) {
  const index = Math.round(((degrees % 360) / 45)) % DIRECTIONS.length;
  return { name: DIRECTIONS[index], abbreviation: DIRECTION_ABBREVIATIONS[index] };
}

function WeatherZoomVisibility({ children }: { children: React.ReactNode }) {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(() => map.getZoom() >= MINIMUM_WEATHER_ZOOM);

  useMapEvents({
    zoomend: () => setIsVisible(map.getZoom() >= MINIMUM_WEATHER_ZOOM),
  });

  return isVisible ? children : null;
}

export default function WeatherOverlay({ locations, selectedLocation, forecastWindow }: WeatherOverlayProps) {
  const overlayItems = useMemo(() => locations.map((location) => {
    const forecast = location.forecasts[forecastWindow];
    const isSelected = location.id === selectedLocation.id;
    const direction = getWindDirection(forecast.windDirection);
    const accessibleLabel = `${location.name}: ${forecast.temperature} degrees, ${forecast.humidity} percent humidity, wind ${forecast.windSpeed} miles per hour from the ${direction.name}.`;
    const html = renderToStaticMarkup(
      <div
        role="img"
        aria-label={accessibleLabel}
        title={accessibleLabel}
        className={`weather-overlay-card${isSelected ? " weather-overlay-card-selected" : ""}`}
      >
        <span className="weather-overlay-name">{location.name.replace(", WA", "")}</span>
        <span className="weather-overlay-values">
          <span><Thermometer aria-hidden="true" />{forecast.temperature}°</span>
          <span><Droplets aria-hidden="true" />{forecast.humidity}%</span>
          <span><Wind aria-hidden="true" />{forecast.windSpeed}</span>
          <span title={`Wind from the ${direction.name}`}><Navigation aria-hidden="true" style={{ transform: `rotate(${forecast.windDirection}deg)` }} />{direction.abbreviation}</span>
        </span>
      </div>,
    );

    return {
      location,
      icon: divIcon({
        className: "weather-overlay-marker",
        html,
        iconSize: [176, 58],
        iconAnchor: [88, 74],
      }),
    };
  }), [forecastWindow, locations, selectedLocation.id]);

  return (
    <WeatherZoomVisibility>
      {overlayItems.map(({ location, icon }) => (
        <Marker
          key={location.id}
          position={[location.latitude, location.longitude]}
          icon={icon}
          interactive={false}
          keyboard={false}
          zIndexOffset={location.id === selectedLocation.id ? 40 : 20}
        />
      ))}
    </WeatherZoomVisibility>
  );
}
