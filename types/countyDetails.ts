export type WeatherHistoryPoint = {
  date: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};

export type CountyStatistics = {
  population: number;
  landAreaSquareMiles: number;
  recentFires: number;
  dominantVegetation: string;
  averageElevationFeet: number;
  annualPrecipitationInches: number;
};

export type CountyDetails = {
  locationId: string;
  statistics: CountyStatistics;
  weatherHistory: WeatherHistoryPoint[];
};
