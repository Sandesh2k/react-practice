export type LocationResult = {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
};

export type GeocodingResponse = {
  results?: LocationResult[];
};

export type WeatherData = {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
  };
};

export type WeatherResult = {
  location: LocationResult;
  weather: WeatherData;
};
