export type RiskLevel = "Low" | "Moderate" | "High" | "Extreme";

export type ForecastWindow = "current" | "6h" | "12h" | "24h" | "48h";

export type WildfireForecast = {
  riskScore: number;
  riskLevel: RiskLevel;
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  vegetationDryness: number;
  modelConfidence: number;
};

export type WildfireLocation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  forecasts: Record<ForecastWindow, WildfireForecast>;
  droughtLevel: string;
  trend: string;
  recentFires: number;
  nearestFireStation: string;
  populationAtRisk: number;
  lastUpdated: string;
};
