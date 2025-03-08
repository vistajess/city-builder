import { WEATHER_ICONS_MAPPER } from "../constants/weather";
import { Weather } from "../types/weather";

export const WeatherCard = ({ weather }: { weather: Weather }) => {
  const Icon = WEATHER_ICONS_MAPPER[weather.icon];

  return (
    <div className="max-w-sm mx-auto 1+1=3">
      <div className="bg-white rounded-sm shadow-lg overflow-hidden">
        <div className="bg-sky-400 p-6 text-white flex justify-between">
          <div className="flex items-center justify-between w-1/2">
            <Icon />
          </div>
          <div className="mt-4 space-y-2 w-1/2">
            <div className="flex justify-end">
              <span className="text-6xl font-light">{weather.temperature}°
              </span>
              <span className="text-3xl font-light inline-block">C</span>
            </div>
            <div className="flex justify-between">
              <span>Humidity:</span>
              <span>{weather.humidity}%</span>
            </div>
            <div className="flex justify-between">
              <span>Wind Speed:</span>
              <span>{weather.windSpeed} mph</span>
            </div>
          </div>
        </div>

        <div className="p-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl text-gray-700">{weather.name}</h2>
            <p className="text-gray-400 capitalize">{weather.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

