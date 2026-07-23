import type { FireStation } from "@/types/fireStation";

// Prototype station inventory. It is not live or operationally verified.
export const fireStations: FireStation[] = [
  { id: "kvfr-21", name: "Kittitas Valley Fire & Rescue Station 21", latitude: 47.44, longitude: -120.50, serviceArea: "Ellensburg and Kittitas Valley", engines: 3, crews: 2, nearestHighRiskDistance: 5.8, serviceLocationIds: ["kittitas"] },
  { id: "kvfr-29", name: "Kittitas Valley Fire & Rescue Station 29", latitude: 47.35, longitude: -120.82, serviceArea: "West Kittitas County", engines: 2, crews: 1, nearestHighRiskDistance: 9.6, serviceLocationIds: ["kittitas"] },
  { id: "wenatchee-1", name: "Wenatchee Valley Fire Station 1", latitude: 47.46, longitude: -120.36, serviceArea: "Central Wenatchee", engines: 4, crews: 3, nearestHighRiskDistance: 3.1, serviceLocationIds: ["wenatchee"] },
  { id: "wenatchee-4", name: "Wenatchee Valley Fire Station 4", latitude: 47.36, longitude: -120.27, serviceArea: "South Wenatchee", engines: 2, crews: 2, nearestHighRiskDistance: 6.4, serviceLocationIds: ["wenatchee"] },
  { id: "spokane-4", name: "Spokane Fire Station 4", latitude: 47.62, longitude: -117.49, serviceArea: "Northeast Spokane", engines: 4, crews: 3, nearestHighRiskDistance: 4.0, serviceLocationIds: ["spokane"] },
  { id: "spokane-15", name: "Spokane Fire Station 15", latitude: 47.70, longitude: -117.48, serviceArea: "North Spokane", engines: 3, crews: 2, nearestHighRiskDistance: 5.7, serviceLocationIds: ["spokane"] },
  { id: "yakima-91", name: "Yakima Fire Station 91", latitude: 46.55, longitude: -120.42, serviceArea: "Central Yakima", engines: 4, crews: 3, nearestHighRiskDistance: 4.8, serviceLocationIds: ["yakima"] },
  { id: "yakima-93", name: "Yakima Fire Station 93", latitude: 46.63, longitude: -120.59, serviceArea: "West Valley", engines: 3, crews: 2, nearestHighRiskDistance: 7.2, serviceLocationIds: ["yakima"] },
];
