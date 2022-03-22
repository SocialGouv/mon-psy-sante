export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface CoordinatesAPI {
  features: {
    geometry: {
      coordinates: number[];
    };
    properties: {
      score: number;
      label: string;
    };
  }[];
}

export type CoordinatesPostgis = {
  type: string;
  coordinates: [number, number];
  crs: { type: string; properties: { name: string } };
};
