import { fireStations } from "@/data/fireStations";
import type { FireStation, FireStationDistance } from "@/types/fireStation";
import type { WildfireLocation } from "@/types/wildfire";

const EARTH_RADIUS_MILES = 3958.8;
const COMPASS_DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

function toRadians(value: number) {
  return value * Math.PI / 180;
}

function getDistanceMiles(location: WildfireLocation, station: FireStation) {
  const latitudeDelta = toRadians(station.latitude - location.latitude);
  const longitudeDelta = toRadians(station.longitude - location.longitude);
  const latitude1 = toRadians(location.latitude);
  const latitude2 = toRadians(station.latitude);
  const a = Math.sin(latitudeDelta / 2) ** 2 + Math.cos(latitude1) * Math.cos(latitude2) * Math.sin(longitudeDelta / 2) ** 2;
  return 2 * EARTH_RADIUS_MILES * Math.asin(Math.sqrt(a));
}

function getDirection(location: WildfireLocation, station: FireStation) {
  const latitude1 = toRadians(location.latitude);
  const latitude2 = toRadians(station.latitude);
  const longitudeDelta = toRadians(station.longitude - location.longitude);
  const y = Math.sin(longitudeDelta) * Math.cos(latitude2);
  const x = Math.cos(latitude1) * Math.sin(latitude2) - Math.sin(latitude1) * Math.cos(latitude2) * Math.cos(longitudeDelta);
  const bearing = (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  return COMPASS_DIRECTIONS[Math.round(bearing / 45) % COMPASS_DIRECTIONS.length];
}

function withDistance(station: FireStation, location: WildfireLocation): FireStationDistance {
  return {
    ...station,
    distanceToSelectedArea: Number(getDistanceMiles(location, station).toFixed(1)),
    directionFromSelectedArea: getDirection(location, station),
  };
}

export function getFireStations() {
  return fireStations;
}

export function getFireStationsForLocation(location: WildfireLocation) {
  return fireStations
    .filter((station) => station.serviceLocationIds.includes(location.id))
    .map((station) => withDistance(station, location))
    .sort((a, b) => a.distanceToSelectedArea - b.distanceToSelectedArea);
}

export function getFireStationsWithDistance(location: WildfireLocation) {
  return fireStations
    .map((station) => withDistance(station, location))
    .sort((a, b) => a.distanceToSelectedArea - b.distanceToSelectedArea);
}

export function getNearestFireStation(location: WildfireLocation) {
  return getFireStationsWithDistance(location)[0];
}
