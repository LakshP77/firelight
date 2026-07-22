import type { RiskLevel } from "@/types/wildfire";

export function getRiskLevel(score: number): RiskLevel {
  if (score >= 76) {
    return "Extreme";
  }

  if (score >= 51) {
    return "High";
  }

  if (score >= 26) {
    return "Moderate";
  }

  return "Low";
}

export function getRiskColor(score: number) {
  if (score >= 76) {
    return "#ef4444";
  }

  if (score >= 51) {
    return "#f97316";
  }

  if (score >= 26) {
    return "#eab308";
  }

  return "#22c55e";
}
