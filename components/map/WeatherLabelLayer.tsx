import { CircleMarker, Tooltip } from "react-leaflet";
import type { ForecastWindow, WildfireLocation } from "@/types/wildfire";

type WeatherLabelLayerProps = {
  locations: WildfireLocation[];
  forecastWindow: ForecastWindow;
};

export default function WeatherLabelLayer({
  locations,
  forecastWindow,
}: WeatherLabelLayerProps) {
  return locations.map((location) => {
    const forecast = location.forecasts[forecastWindow];

    return (
      <CircleMarker
        key={location.id}
        center={[location.latitude, location.longitude]}
        radius={1}
        interactive={false}
        pathOptions={{ opacity: 0, fillOpacity: 0 }}
      >
        <Tooltip
          permanent
          direction="top"
          offset={[0, -14]}
          opacity={1}
          className="weather-map-label"
        >
          {forecast.temperature}°F · {forecast.windSpeed} mph
        </Tooltip>
      </CircleMarker>
    );
  });
}
