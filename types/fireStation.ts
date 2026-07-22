export type FireStation = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  serviceArea: string;
  engines: number;
  crews: number;
  nearestHighRiskDistance: number;
  serviceLocationIds: string[];
};

export type FireStationDistance = FireStation & {
  distanceToSelectedArea: number;
  directionFromSelectedArea: string;
};
