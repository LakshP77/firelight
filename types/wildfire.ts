export type RiskLevel = "Low" | "Moderate" | "High" | "Extreme";

export type WildfireLocation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  riskScore: number;
  riskLevel: RiskLevel;
  temperature: number;
  humidity: number;
  windSpeed: number;
  vegetationDryness: number;
  droughtLevel: string;
  trend: string;
  predictionWindow: string;
  recentFires: number;
  nearestFireStation: string;
  populationAtRisk: number;
  modelConfidence: number;
  lastUpdated: string;
};