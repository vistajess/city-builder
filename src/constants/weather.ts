import { CloudIcon, FogIcon, MoonIcon, RainIcon, SnowIcon, SunIcon, ThunderIcon } from '../components/icon/icon';

export const OPEN_WEATHER_IMAGE_URL = 'http://openweathermap.org/img/w/';
export const OPEN_WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// OpenWeather provides a set of icons for different weather conditions. Here’s a full list of them:
// https://openweathermap.org/weather-conditions
export const WEATHER_ICONS_MAPPER: Record<string, any> = {
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
