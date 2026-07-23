export type WeatherHistoryPoint = {
  date: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};

export type CountyStatistics = {
  population: number | null;
  landAreaSquareMiles: number | null;
  recentFires: number | null;
  dominantVegetation: string | null;
  averageElevationFeet: number | null;
  averageAnnualRainfallInches: number | null;
};

export type CountyDetails = {
  locationId: string;
  statistics: CountyStatistics;
  weatherHistory: WeatherHistoryPoint[];
};
