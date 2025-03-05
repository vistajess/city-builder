'use client';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { forwardRef, useEffect, useState } from "react";
import { AVAILABLE_LOCATIONS } from "../constants/location";
import { useHouseContext } from "../contexts/house-context";
import { useWeatherQuery } from "../hooks/weather";
import { Location } from "../types/location";
import { Weather } from "../types/weather";
import { BaseModal } from "./base-modal";
import { Loader } from "./loader/loader";
import { Button } from "./ui/button";
import { WeatherCard } from "./weather-card";
import { useImperativeHandle } from "react";

export type LocationPickerRef = {
  openModal: () => void;
  closeModal: () => void;
};

const LocationPicker = forwardRef(({ onSave }: { onSave: () => void }, ref) => {
  const { savedLocation, setSavedLocation } = useHouseContext();
  const [currentLocation, setCurrentLocation] = useState<Location>(AVAILABLE_LOCATIONS[0]);
  const [isOpen, setIsOpen] = useState(true);
  const [weatherData, setWeatherData] = useState<Weather | null>(null);
  const { data, isLoading, isError, error } = useWeatherQuery(currentLocation);


  useImperativeHandle(ref, () => ({
    openModal() {
      setIsOpen(true);
    },
    closeModal() {
      setIsOpen(false);
    }
  }));

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
    setSavedLocation({ ...currentLocation, weather: weatherData });
    setIsOpen(false);
  }

  const handleSelectLocation = (locationId: string) => {
    setCurrentLocation(prevcurrentLocation => {
      return AVAILABLE_LOCATIONS.find(location => location.id === locationId)
    });
  }

  return (
    <BaseModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      description="Choose a location where you want to build your city."
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
            {isLoading ?
              (<div className="w-full flex justify-center items-center h-[260px]">
                <Loader />
              </div>) :
              (weatherData && <WeatherCard weather={weatherData} />)}
            {isError && <div>{error.message}</div>}
          </div>
        </div>
      </div>
    </BaseModal>
  );
});

export default LocationPicker;

