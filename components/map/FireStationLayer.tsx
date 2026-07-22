"use client";

import { useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { divIcon } from "leaflet";
import { Building2 } from "lucide-react";
import { Marker, Polyline, Popup } from "react-leaflet";
import { getFireStationsWithDistance, getNearestFireStation } from "@/services/fireStationService";
import type { WildfireLocation } from "@/types/wildfire";

export default function FireStationLayer({ selectedLocation }: { selectedLocation: WildfireLocation }) {
  const nearestStation = useMemo(() => getNearestFireStation(selectedLocation), [selectedLocation]);
  const stationMarkers = useMemo(() => getFireStationsWithDistance(selectedLocation).map((station) => {
    const isNearest = station.id === nearestStation.id;
    const label = `${station.name}, ${station.serviceArea}. ${station.engines} engines. ${station.distanceToSelectedArea} miles ${station.directionFromSelectedArea} from the selected area.${isNearest ? " Nearest station." : ""}`;
    return {
      station,
      isNearest,
      icon: divIcon({
        className: "fire-station-marker",
        html: renderToStaticMarkup(<span role="img" aria-label={label} title={label} className={`fire-station-icon${isNearest ? " fire-station-icon-nearest" : ""}`}><Building2 aria-hidden="true" /><span className="sr-only">{isNearest ? "Nearest" : "Fire"} station</span></span>),
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16],
      }),
    };
  }), [nearestStation.id, selectedLocation]);

  return (
    <>
      <Polyline
        positions={[[selectedLocation.latitude, selectedLocation.longitude], [nearestStation.latitude, nearestStation.longitude]]}
        interactive={false}
        pathOptions={{ color: "#f97316", opacity: 0.3, weight: 1.5, dashArray: "5 7" }}
      />
      {stationMarkers.map(({ station, isNearest, icon }) => (
        <Marker key={station.id} position={[station.latitude, station.longitude]} icon={icon} zIndexOffset={isNearest ? 30 : 10}>
          <Popup>
            <div className="min-w-44 text-xs leading-5">
              <strong className="text-sm">{station.name}</strong>
              {isNearest && <span className="ml-2 rounded bg-orange-500/15 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-orange-400">Nearest</span>}
              <p className="mt-1 text-white/55">{station.serviceArea}</p>
              <dl className="mt-2 grid grid-cols-[1fr_auto] gap-x-4 text-white/65">
                <dt>Engines</dt><dd>{station.engines}</dd>
                <dt>Crews</dt><dd>{station.crews}</dd>
                <dt>Distance</dt><dd>{station.distanceToSelectedArea} mi {station.directionFromSelectedArea}</dd>
                <dt>Nearest high risk</dt><dd>{station.nearestHighRiskDistance} mi</dd>
              </dl>
              <p className="mt-2 text-[9px] text-white/35">Prototype data; not operationally verified.</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
