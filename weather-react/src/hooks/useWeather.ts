import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../api";

export function useWeather(city: string) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: ({ signal }) => fetchWeather(city, signal),
    enabled: Boolean(city),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30_000),
    placeholderData: (previousData) => previousData,
  });
}
