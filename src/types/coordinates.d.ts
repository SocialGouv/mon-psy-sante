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
