import { CloudIcon, FogIcon, MoonIcon, RainIcon, SnowIcon, SunIcon, ThunderIcon } from '../components/icon/icon';
import { JSX } from 'react';

export const OPEN_WEATHER_IMAGE_URL = 'http://openweathermap.org/img/w/';
export const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// OpenWeather provides a set of icons for different weather conditions. Here’s a full list of them:
// https://openweathermap.org/weather-conditions
export const WEATHER_ICONS_MAPPER: Record<string, () => JSX.Element> = {
  '01d': SunIcon,       // Clear sky
  '01n': MoonIcon,      // Clear sky
  '02d': CloudIcon,     // Few clouds
  '02n': CloudIcon,     // Few clouds
  '03d': CloudIcon,     // Scattered clouds
  '03n': CloudIcon,     // Scattered clouds
  '04d': CloudIcon,     // Broken clouds
  '04n': CloudIcon,     // Broken clouds
  '09d': RainIcon,      // Shower rain
  '09n': RainIcon,      // Shower rain
  '10d': RainIcon,      // Rain
  '10n': RainIcon,      // Rain
  '11d': ThunderIcon,   // Thunderstorm
  '11n': ThunderIcon,   // Thunderstorm
  '13d': SnowIcon,      // Snow
  '13n': SnowIcon,      // Snow
  '50d': FogIcon,       // Mist
  '50n': FogIcon,       // Mist
};

export const WEATHER_BG_MAPPER: Record<string, string> = {
  "01d": "bg-sunny",    // Clear sky (day)
  "01n": "bg-clear-night",  // Clear sky (night)
  "02d": "bg-clear-day",       // Few clouds (day)
  "02n": "bg-cloudy",       // Few clouds (night)
  "03d": "bg-cloudy",       // Scattered clouds
  "03n": "bg-cloudy",
  "04d": "bg-cloudy",       // Broken clouds
  "04n": "bg-cloudy",
  "09d": "bg-rainy",        // Shower rain
  "09n": "bg-rainy",
  "10d": "bg-rainy",        // Rain
  "10n": "bg-rainy",
  "11d": "bg-stormy",       // Thunderstorm
  "11n": "bg-stormy",
  "13d": "bg-snowy",        // Snow
  "13n": "bg-snowy",
  "50d": "bg-foggy",        // Mist/Fog
  "50n": "bg-foggy",
};

