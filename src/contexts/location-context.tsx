import { createContext, useContext, useState } from "react";
import { Location } from "../types/location";

interface LocationContextType {
  currentLocation: Location | null;
  setCurrentLocation: (location: Location) => void;
}

export const LocationContext = createContext<LocationContextType>({
  currentLocation: null,
  setCurrentLocation: () => {},
});

export type LocationContextProviderProps = {
  children: React.ReactNode;
};

export const LocationContextProvider = ({
  children,
}: LocationContextProviderProps) => {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

  const handleLocationChange = (location: Location) => {
    setCurrentLocation(location);
  };

  const contextValue: LocationContextType = {
    currentLocation,
    setCurrentLocation: handleLocationChange,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return context;
};