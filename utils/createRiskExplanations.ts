import type { WildfireForecast } from "@/types/wildfire";

export type RiskExplanation = {
  id: "humidity" | "wind" | "vegetation" | "temperature" | "drought";
  text: string;
  severity: number;
};

type RankedExplanation = RiskExplanation & {
  ruleOrder: number;
};

export function createRiskExplanations(
  forecast: WildfireForecast,
  droughtLevel: string,
): RiskExplanation[] {
  const candidates: RankedExplanation[] = [
    createHumidityExplanation(forecast.humidity, 0),
    createWindExplanation(forecast.windSpeed, 1),
    createVegetationExplanation(forecast.vegetationDryness, 2),
    createTemperatureExplanation(forecast.temperature, 3),
    createDroughtExplanation(droughtLevel, 4),
  ];

  const maximumExplanations = forecast.riskScore >= 76 ? 4 : 3;

  return candidates
    .filter((explanation) => explanation.severity >= 50)
    .sort(
      (first, second) =>
        second.severity - first.severity || first.ruleOrder - second.ruleOrder,
    )
    .slice(0, maximumExplanations)
    .map(({ id, text, severity }) => ({ id, text, severity }));
}

function createHumidityExplanation(
  humidity: number,
  ruleOrder: number,
): RankedExplanation {
  if (humidity <= 15) {
    return {
      id: "humidity",
      text: `Humidity is extremely low at ${humidity}%, making vegetation easier to ignite.`,
      severity: 100,
      ruleOrder,
    };
  }

  if (humidity <= 20) {
    return {
      id: "humidity",
      text: `Humidity is very low at ${humidity}%, increasing the potential for ignition.`,
      severity: 90,
      ruleOrder,
    };
  }

  if (humidity <= 25) {
    return {
      id: "humidity",
      text: `Humidity is down to ${humidity}%, reducing moisture in available fuels.`,
      severity: 75,
      ruleOrder,
    };
  }

  return {
    id: "humidity",
    text: `Humidity is ${humidity}%, so fine fuels may be more receptive to ignition.`,
    severity: humidity <= 30 ? 60 : 0,
    ruleOrder,
  };
}

function createWindExplanation(
  windSpeed: number,
  ruleOrder: number,
): RankedExplanation {
  if (windSpeed >= 25) {
    return {
      id: "wind",
      text: `Winds near ${windSpeed} mph could accelerate fire spread and carry embers farther.`,
      severity: windSpeed >= 30 ? 100 : 90,
      ruleOrder,
    };
  }

  if (windSpeed >= 20) {
    return {
      id: "wind",
      text: `Winds near ${windSpeed} mph could cause a fire to spread more quickly.`,
      severity: 75,
      ruleOrder,
    };
  }

  return {
    id: "wind",
    text: `Winds near ${windSpeed} mph may support faster fire movement.`,
    severity: windSpeed >= 15 ? 60 : 0,
    ruleOrder,
  };
}

function createVegetationExplanation(
  vegetationDryness: number,
  ruleOrder: number,
): RankedExplanation {
  if (vegetationDryness >= 90) {
    return {
      id: "vegetation",
      text: `Vegetation dryness is ${vegetationDryness}%, providing abundant available fuel.`,
      severity: 100,
      ruleOrder,
    };
  }

  if (vegetationDryness >= 85) {
    return {
      id: "vegetation",
      text: `Vegetation dryness is ${vegetationDryness}%, increasing the amount of available fuel.`,
      severity: 90,
      ruleOrder,
    };
  }

  if (vegetationDryness >= 80) {
    return {
      id: "vegetation",
      text: `Vegetation dryness has reached ${vegetationDryness}%, increasing available fuel.`,
      severity: 80,
      ruleOrder,
    };
  }

  return {
    id: "vegetation",
    text: `Vegetation dryness is ${vegetationDryness}%, which could help sustain a fire.`,
    severity: vegetationDryness >= 70 ? 60 : 0,
    ruleOrder,
  };
}

function createTemperatureExplanation(
  temperature: number,
  ruleOrder: number,
): RankedExplanation {
  if (temperature >= 100) {
    return {
      id: "temperature",
      text: `Temperatures near ${temperature}°F are contributing to rapid drying of fuels.`,
      severity: 100,
      ruleOrder,
    };
  }

  if (temperature >= 95) {
    return {
      id: "temperature",
      text: `Temperatures near ${temperature}°F are contributing to drier conditions.`,
      severity: 85,
      ruleOrder,
    };
  }

  return {
    id: "temperature",
    text: `Temperatures near ${temperature}°F are increasing moisture loss from vegetation.`,
    severity: temperature >= 90 ? 65 : temperature >= 85 ? 50 : 0,
    ruleOrder,
  };
}

function createDroughtExplanation(
  droughtLevel: string,
  ruleOrder: number,
): RankedExplanation {
  const normalizedDrought = droughtLevel.trim().toLowerCase();

  if (normalizedDrought === "extreme") {
    return {
      id: "drought",
      text: `${droughtLevel} drought has substantially raised the broader fire danger.`,
      severity: 100,
      ruleOrder,
    };
  }

  if (normalizedDrought === "severe") {
    return {
      id: "drought",
      text: `${droughtLevel} drought is raising the overall fire danger across the area.`,
      severity: 90,
      ruleOrder,
    };
  }

  return {
    id: "drought",
    text: `${droughtLevel} drought is adding to the area's underlying fire danger.`,
    severity: normalizedDrought === "moderate" ? 60 : 0,
    ruleOrder,
  };
}
