import { Location } from "../types/location";

export const fetchWeather = async (location: Location) => {
  try {
    const res = await fetch(`/api/weather?lat=${location.latitude}&lon=${location.longitude}`);

    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data = await res.json();
    console.log(data);
    if (!data) {
      throw new Error(data.message ||"No weather data received");
    }

    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
};