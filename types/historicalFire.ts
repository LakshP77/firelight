export type HistoricalFire = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  year: number;
  locationId?: string;
  acresBurned?: number;
  cause?: string;
};
