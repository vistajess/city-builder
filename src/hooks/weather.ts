'use client';
import { useQuery } from "@tanstack/react-query";
import { fetchWeather } from "../services/weather";
import { Location } from "../types/location";

export const useWeatherQuery = (location: Location) => {
  return useQuery({
    queryKey: ["GET /weather", location.id],
    queryFn: () => fetchWeather(location),
    enabled: !!location,
    staleTime: 120000 // 2 minutes in milliseconds
  });
}