"use client";

import {
  CircleMarker,
  MapContainer as LeafletMap,
  Popup,
  TileLayer,
} from "react-leaflet";

const locations = [
  {
    name: "Kittitas County, WA",
    coordinates: [47.38, -120.58] as [number, number],
    risk: 82,
    level: "High Risk",
  },
  {
    name: "Wenatchee, WA",
    coordinates: [47.4235, -120.3103] as [number, number],
    risk: 74,
    level: "High Risk",
  },
  {
    name: "Spokane, WA",
    coordinates: [47.6588, -117.426] as [number, number],
    risk: 88,
    level: "Extreme Risk",
  },
  {
    name: "Yakima, WA",
    coordinates: [46.6021, -120.5059] as [number, number],
    risk: 69,
    level: "High Risk",
  },
];

function getRiskColor(score: number) {
  if (score >= 76) return "#ef4444";
  if (score >= 51) return "#f97316";
  if (score >= 26) return "#eab308";
  return "#22c55e";
}

export default function MapContainer() {
  return (
    <div className="relative min-h-[700px] overflow-hidden rounded-xl border border-white/10 bg-[#10161c]">
      <LeafletMap
        center={[47.4, -120.7]}
        zoom={7}
        minZoom={6}
        className="h-[700px] w-full"
        zoomControl={true}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {locations.map((location) => (
          <CircleMarker
            key={location.name}
            center={location.coordinates}
            radius={12}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: getRiskColor(location.risk),
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <div>
                <strong>{location.name}</strong>
                <br />
                {location.level}
                <br />
                Score: {location.risk}/100
              </div>
            </Popup>
          </CircleMarker>
        ))}
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