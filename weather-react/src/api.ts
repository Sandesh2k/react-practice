import type { GeocodingResponse, LocationResult, WeatherData, WeatherResult } from "./types";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export async function fetchWeather(city: string, signal: AbortSignal): Promise<WeatherResult> {
  const params = new URLSearchParams({ name: city, count: "1" });
  const locationData = await fetchJson<GeocodingResponse>(`${GEOCODING_URL}?${params}`, signal);

  const location: LocationResult | undefined = locationData.results?.[0];
  if (!location) throw new Error(`Could not find a city named "${city}".`);

  const weatherParams = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m"
  });

  const weather = await fetchJson<WeatherData>(`${WEATHER_URL}?${weatherParams}`, signal);
  return { location, weather };
}
