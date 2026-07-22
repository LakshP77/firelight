import { getRiskLevel } from "@/lib/risk";
import type { WildfireForecast, WildfireLocation } from "@/types/wildfire";

function forecast(
  riskScore: number,
  temperature: number,
  humidity: number,
  windSpeed: number,
  vegetationDryness: number,
  modelConfidence: number,
): WildfireForecast {
  return {
    riskScore,
    riskLevel: getRiskLevel(riskScore),
    temperature,
    humidity,
    windSpeed,
    vegetationDryness,
    modelConfidence,
  };
}

// Future API boundary: replace these keyed forecast snapshots with response data.
export const mockLocations: WildfireLocation[] = [
  {
    id: "kittitas",
    name: "Kittitas County, WA",
    latitude: 47.38,
    longitude: -120.58,
    forecasts: {
      current: forecast(82, 94, 18, 21, 86, 86),
      "6h": forecast(85, 96, 16, 23, 87, 85),
      "12h": forecast(88, 97, 15, 25, 89, 84),
      "24h": forecast(91, 98, 14, 27, 91, 82),
      "48h": forecast(86, 93, 19, 20, 88, 78),
    },
    droughtLevel: "Severe",
    trend: "Rising",
    recentFires: 14,
    nearestFireStation: "6.2 mi NE",
    populationAtRisk: 12400,
    lastUpdated: "Jul 15, 2026 2:30 PM PDT",
  },
  {
    id: "wenatchee",
    name: "Wenatchee, WA",
    latitude: 47.4235,
    longitude: -120.3103,
    forecasts: {
      current: forecast(74, 91, 24, 18, 79, 81),
      "6h": forecast(77, 93, 21, 20, 81, 80),
      "12h": forecast(80, 94, 19, 22, 83, 79),
      "24h": forecast(83, 95, 18, 24, 85, 77),
      "48h": forecast(78, 90, 25, 17, 81, 74),
    },
    droughtLevel: "Moderate",
    trend: "Stable",
    recentFires: 9,
    nearestFireStation: "3.8 mi NW",
    populationAtRisk: 8200,
    lastUpdated: "Jul 15, 2026 2:30 PM PDT",
  },
  {
    id: "spokane",
    name: "Spokane, WA",
    latitude: 47.6588,
    longitude: -117.426,
    forecasts: {
      current: forecast(89, 97, 15, 26, 91, 90),
      "6h": forecast(92, 99, 13, 28, 92, 89),
      "12h": forecast(94, 100, 12, 30, 94, 88),
      "24h": forecast(90, 96, 16, 24, 92, 85),
      "48h": forecast(84, 91, 22, 19, 87, 80),
    },
    droughtLevel: "Severe",
    trend: "Rising",
    recentFires: 18,
    nearestFireStation: "4.1 mi SW",
    populationAtRisk: 18600,
    lastUpdated: "Jul 15, 2026 2:30 PM PDT",
  },
  {
    id: "yakima",
    name: "Yakima, WA",
    latitude: 46.6021,
    longitude: -120.5059,
    forecasts: {
      current: forecast(68, 90, 27, 16, 75, 78),
      "6h": forecast(71, 92, 24, 18, 77, 77),
      "12h": forecast(75, 94, 21, 20, 79, 76),
      "24h": forecast(79, 95, 19, 22, 82, 74),
      "48h": forecast(73, 89, 28, 15, 78, 71),
    },
    droughtLevel: "Moderate",
    trend: "Stable",
    recentFires: 11,
    nearestFireStation: "5.4 mi SE",
    populationAtRisk: 9700,
    lastUpdated: "Jul 15, 2026 2:30 PM PDT",
  },
];
