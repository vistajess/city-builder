'use client';

import { createContext, useContext, useState } from "react";
import { House } from "../types/house";
import { Location } from "../types/location";
interface HouseContextType {
  savedLocation: Location | null;
  setSavedLocation: (location: Location) => void;
  houses: House[];
  getHousesByLocation: (locationId: string) => void;
  addHouse: (house: House) => void;
  updateHouse: (house: House) => void;
  deleteHouse: (house: House) => void;
}

export const HouseContext = createContext<HouseContextType>({
  savedLocation: null,
  setSavedLocation: (location: Location) => { },
  houses: [],
  getHousesByLocation: (locationId: string) => { },
  addHouse: (house: House) => { },
  updateHouse: (house: House) => { },
  deleteHouse: (house: House) => { },
});

export type HousesContextProviderProps = {
  children: React.ReactNode;
};

export const HouseContextProvider = ({ children }: HousesContextProviderProps) => {
  const [houses, setHouses] = useState<House[]>([]);
  const [savedLocation, setSavedLocation] = useState<Location | null>(null);

  const handleSavedLocation = (location: Location) => {
    setSavedLocation(location);
  }

  const getHousesByLocation = (locationId: string) => {
    setHouses(houses.filter((h) => h.location.id === locationId));
  }

  const addHouse = (house: House) => {
    setHouses([...houses, house]);
  }

  const updateHouse = (house: House) => {
    setHouses(houses.map((h) => (h.id === house.id ? house : h)));
  }

  const deleteHouse = (house: House) => {
    setHouses(houses.filter((h) => h.id !== house.id));
  }

  const contextvalue: HouseContextType = {
    savedLocation,
    setSavedLocation: handleSavedLocation,
    houses,
    getHousesByLocation,
    addHouse,
    updateHouse,
    deleteHouse,
  }

  return (
    <HouseContext.Provider value={contextvalue}>
      {children}
    </HouseContext.Provider>
  );
};

export const useHouseContext = () => {
  const context = useContext(HouseContext);
  if (context === undefined) {
    throw new Error('useHouseContext must be used within a HouseProvider');
  }
  return context;
};
