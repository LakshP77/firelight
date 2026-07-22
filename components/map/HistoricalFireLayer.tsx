import { CircleMarker, Popup } from "react-leaflet";
import type { HistoricalFire } from "@/types/historicalFire";

type HistoricalFireLayerProps = {
  fires: HistoricalFire[];
};

export default function HistoricalFireLayer({
  fires,
}: HistoricalFireLayerProps) {
  return fires.map((fire) => (
    <CircleMarker
      key={fire.id}
      center={[fire.latitude, fire.longitude]}
      radius={5}
      pathOptions={{
        color: "#9ca3af",
        weight: 1,
        fillColor: "#c2410c",
        fillOpacity: 0.65,
      }}
    >
      <Popup>
        <div>
          <strong>{fire.name}</strong>
          <br />
          Historical fire · {fire.year}
        </div>
      </Popup>
    </CircleMarker>
  ));
}
