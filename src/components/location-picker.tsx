'use client';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { useEffect, useState } from "react";
import { AVAILABLE_LOCATIONS } from "../constants/location";
import { useHouseContext } from "../contexts/house-context";
import { useWeatherQuery } from "../hooks/weather";
import { Location } from "../types/location";
import { Weather } from "../types/weather";
import { DialogModal } from "./dialog-modal";
import { Button } from "./ui/button";
import { WeatherCard } from "./weather-card";

const LocationPicker = ({ onSave }: { onSave: () => void }) => {
  const { houses } = useHouseContext();
  const [currentLocation, setCurrentLocation] = useState<Location>(AVAILABLE_LOCATIONS[0]);
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const { data, isLoading, isError, error } = useWeatherQuery(currentLocation);

  useEffect(() => {
    if (data && data.weather && data.main) {
      setWeatherData({
        id: data.id,
        name: data.name,
        temperature: data.main?.temp,
        humidity: data.main?.humidity,
        windSpeed: data.wind?.speed,
        icon: data.weather[0]?.icon,
        description: data.weather[0]?.description
      });
    }
  }, [data]);

  const handleSave = () => {
    onSave();
  }

  const handleSelectLocation = (locationId: string) => {
    setCurrentLocation(prevcurrentLocation => {
      return AVAILABLE_LOCATIONS.find(location => location.id === locationId) || null
    });
  }

  return (
    <DialogModal
      isOpen={houses.length === 0}
      onPrimaryClick={handleSave}
      description="Choose a location where you want to build your city."
      primaryButtonText="Save"
      triggerText="Choose Desired Location"
      title="Choose Desired Location"
      footerChildren={<Button disabled={!weatherData || isLoading} onClick={handleSave}>Save</Button>}
    >
      <div className="grid gap-4 py-4">
        <Select defaultValue={AVAILABLE_LOCATIONS[0].id} onValueChange={(value) => handleSelectLocation(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Available Locations</SelectLabel>
              {AVAILABLE_LOCATIONS.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <div>
          <div className="text-sm text-muted-foreground">
            {isLoading ? <div>Loading...</div> : (weatherData && <WeatherCard weather={weatherData} />)}
            {isError && <div>{error.message}</div>}
          </div>
        </div>
      </div>
    </DialogModal>
  );
};

export default LocationPicker;

