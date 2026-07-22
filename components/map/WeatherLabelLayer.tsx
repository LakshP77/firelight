import { CircleMarker, Tooltip } from "react-leaflet";
import type { WildfireLocation } from "@/types/wildfire";

type WeatherLabelLayerProps = {
  locations: WildfireLocation[];
};

export default function WeatherLabelLayer({
  locations,
}: WeatherLabelLayerProps) {
  return locations.map((location) => (
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
        {location.temperature}°F · {location.windSpeed} mph
      </Tooltip>
    </CircleMarker>
  ));
}
