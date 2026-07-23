import { countyDetails } from "@/data/countyDetails";

// Future API boundary for county metadata.
export function getCountyDetails(locationId: string) {
  return countyDetails[locationId] ?? null;
}

export function getCountyStatistics(locationId: string) {
  return getCountyDetails(locationId)?.statistics ?? null;
}
