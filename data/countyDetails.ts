import type { CountyDetails } from "@/types/countyDetails";

const weatherDates = ["Jul 9", "Jul 10", "Jul 11", "Jul 12", "Jul 13", "Jul 14", "Jul 15"];

function weatherHistory(
  temperatures: number[],
  humidities: number[],
  windSpeeds: number[],
) {
  return weatherDates.map((date, index) => ({
    date,
    temperature: temperatures[index],
    humidity: humidities[index],
    windSpeed: windSpeeds[index],
  }));
}

// Prototype county context. Replace this module at the future county-details API boundary.
export const countyDetails: Record<string, CountyDetails> = {
  kittitas: {
    locationId: "kittitas",
    statistics: { population: 48400, landAreaSquareMiles: 2297, recentFires: 14, dominantVegetation: "Ponderosa pine and shrub-steppe", averageElevationFeet: 2520, annualPrecipitationInches: 22 },
    fireStations: [
      { id: "kvfr-21", name: "Kittitas Valley Fire & Rescue Station 21", distanceMiles: 6.2, direction: "NE", serviceArea: "Ellensburg and Kittitas Valley" },
      { id: "kvfr-29", name: "Kittitas Valley Fire & Rescue Station 29", distanceMiles: 11.4, direction: "W", serviceArea: "West Kittitas County" },
    ],
    weatherHistory: weatherHistory([88, 90, 91, 93, 92, 95, 94], [27, 24, 23, 21, 22, 19, 18], [13, 15, 17, 18, 16, 20, 21]),
  },
  wenatchee: {
    locationId: "wenatchee",
    statistics: { population: 35900, landAreaSquareMiles: 11, recentFires: 9, dominantVegetation: "Dry forest and orchard", averageElevationFeet: 780, annualPrecipitationInches: 9 },
    fireStations: [
      { id: "wenatchee-1", name: "Wenatchee Valley Fire Station 1", distanceMiles: 3.8, direction: "NW", serviceArea: "Central Wenatchee" },
      { id: "wenatchee-4", name: "Wenatchee Valley Fire Station 4", distanceMiles: 7.1, direction: "SE", serviceArea: "South Wenatchee" },
    ],
    weatherHistory: weatherHistory([86, 87, 89, 90, 92, 92, 91], [31, 29, 27, 26, 23, 22, 24], [11, 14, 13, 16, 17, 19, 18]),
  },
  spokane: {
    locationId: "spokane",
    statistics: { population: 230200, landAreaSquareMiles: 69, recentFires: 18, dominantVegetation: "Pine forest and grassland", averageElevationFeet: 1843, annualPrecipitationInches: 17 },
    fireStations: [
      { id: "spokane-4", name: "Spokane Fire Station 4", distanceMiles: 4.1, direction: "SW", serviceArea: "Northeast Spokane" },
      { id: "spokane-15", name: "Spokane Fire Station 15", distanceMiles: 6.7, direction: "W", serviceArea: "North Spokane" },
    ],
    weatherHistory: weatherHistory([89, 91, 93, 95, 96, 98, 97], [24, 21, 20, 18, 17, 14, 15], [17, 19, 21, 22, 24, 25, 26]),
  },
  yakima: {
    locationId: "yakima",
    statistics: { population: 98000, landAreaSquareMiles: 28, recentFires: 11, dominantVegetation: "Shrub-steppe and grassland", averageElevationFeet: 1066, annualPrecipitationInches: 8 },
    fireStations: [
      { id: "yakima-91", name: "Yakima Fire Station 91", distanceMiles: 5.4, direction: "SE", serviceArea: "Central Yakima" },
      { id: "yakima-93", name: "Yakima Fire Station 93", distanceMiles: 8.6, direction: "NW", serviceArea: "West Valley" },
    ],
    weatherHistory: weatherHistory([84, 86, 87, 89, 91, 91, 90], [35, 32, 31, 29, 26, 25, 27], [10, 12, 13, 15, 14, 17, 16]),
  },
};
