const NOT_AVAILABLE = "Not available";

function formatNumber(value: number | null | undefined) {
  return value == null || !Number.isFinite(value) ? NOT_AVAILABLE : value.toLocaleString();
}

export function formatPopulation(value: number | null | undefined) {
  return formatNumber(value);
}

export function formatLandArea(value: number | null | undefined) {
  const formatted = formatNumber(value);
  return formatted === NOT_AVAILABLE ? formatted : `${formatted} sq mi`;
}

export function formatRecentFires(value: number | null | undefined) {
  return formatNumber(value);
}

export function formatElevation(value: number | null | undefined) {
  const formatted = formatNumber(value);
  return formatted === NOT_AVAILABLE ? formatted : `${formatted} ft`;
}

export function formatRainfall(value: number | null | undefined) {
  const formatted = formatNumber(value);
  return formatted === NOT_AVAILABLE ? formatted : `${formatted} in/year`;
}

export function formatText(value: string | null | undefined) {
  return value?.trim() || NOT_AVAILABLE;
}
