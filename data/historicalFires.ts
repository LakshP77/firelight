import type { HistoricalFire } from "@/types/historicalFire";

export const historicalFires: HistoricalFire[] = [
  {
    id: "jolly-mountain",
    name: "Jolly Mountain Fire",
    latitude: 47.435,
    longitude: -121.05,
    year: 2017,
    locationId: "kittitas",
    acresBurned: 36514,
    cause: "Lightning",
  },
  {
    id: "sleepy-hollow",
    name: "Sleepy Hollow Fire",
    latitude: 47.44,
    longitude: -120.35,
    year: 2015,
    locationId: "wenatchee",
    acresBurned: 2950,
    cause: "Human-caused",
  },
  {
    id: "gray-fire",
    name: "Gray Fire",
    latitude: 47.55,
    longitude: -117.71,
    year: 2023,
    locationId: "spokane",
    acresBurned: 1085,
    cause: "Under investigation",
  },
  {
    id: "schneider-springs",
    name: "Schneider Springs Fire",
    latitude: 46.97,
    longitude: -121.06,
    year: 2021,
    locationId: "yakima",
    acresBurned: 107337,
    cause: "Lightning",
  },
];
