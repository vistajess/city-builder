import { TooltipContent } from "../ui/tooltip";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TooltipProvider, TooltipTrigger } from "../ui/tooltip";

import { Tooltip } from "../ui/tooltip";
import { Location } from "@/src/types/location";
import { WEATHER_ICONS_MAPPER } from "@/src/constants/weather";

export const LocationWeatherDetails = ({
  savedLocation,
}: {
  savedLocation: Location;
}) => {
  const Icon = WEATHER_ICONS_MAPPER[savedLocation.weather?.icon || "01d"];
  return (
    <div className="bg-blue-400 text-white rounded-t-lg p-4 shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="text-3xl font-bold flex items-center gap-2">
            {savedLocation.name}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 hover:bg-blue-500/50 transition-colors disabled:opacity-50"
                  >
                    {/* <ArrowPathIcon className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} /> */}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh weather data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="font-medium capitalize">
            {savedLocation.weather?.description || "No weather data"}
          </div>
          <div className="font-sm capitalize mt-1 flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-500/50 border-none">
              {savedLocation.latitude}, {savedLocation.longitude}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-500/20 backdrop-blur-sm">
            <Icon />
          </div>
          <div className="font-medium text-2xl capitalize">
            {savedLocation.weather?.temperature ?? "--"}°C
          </div>
          {savedLocation.weather && (
            <div className="text-sm flex gap-2 mt-1">
              <Badge variant="secondary" className="bg-blue-500/50 border-none">
                Humidity: {savedLocation.weather.humidity}%
              </Badge>
              <Badge variant="secondary" className="bg-blue-500/50 border-none">
                Wind: {savedLocation.weather.windSpeed}m/s
              </Badge>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
