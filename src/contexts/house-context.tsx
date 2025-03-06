"use client";

import { createContext, useContext, useState } from "react";
import { generateUUID } from "../lib/id-generator";
import { House } from "../types/house";
import { Location } from "../types/location";
interface HouseContextType {
  savedLocation: Location | null;
  setSavedLocation: (location: Location) => void;
  houses: Map<string, House>;
  getHousesByLocation: (locationId: string) => void;
  addHouse: (house: House) => void;
  updateHouse: (house: House) => void;
  deleteHouse: (id: string) => void;
  selectedHouse: House | null;
  setSelectedHouse: (id: string) => void;
}

export const HouseContext = createContext<HouseContextType>({
  savedLocation: null,
  setSavedLocation: (location: Location) => {},
  houses: new Map<string, House>(),
  getHousesByLocation: (locationId: string) => {},
  addHouse: (house: House) => {},
  updateHouse: (house: House) => {},
  deleteHouse: (id: string) => {},
  selectedHouse: null,
  setSelectedHouse: (id: string) => {},
});

export type HousesContextProviderProps = {
  children: React.ReactNode;
};

export const HouseContextProvider = ({
  children,
}: HousesContextProviderProps) => {
  const [houses, setHouses] = useState<Map<string, House>>(new Map());
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [savedLocation, setSavedLocation] = useState<Location | null>(null);

  const handleSavedLocation = (location: Location) => {
    setSavedLocation(location);
  };

  const handleSelectHouse = (houseId: string) => {
    const house = houses.get(houseId);
    console.log("select house", house);
    if (house) {
      setSelectedHouse(house);
    }
  }

  const getHousesByLocation = (locationId: string) => {
    setHouses(houses.filter((h) => h.location.id === locationId));
  };

  const addHouse = (house: House) => {
    setHouses((prevHouses) => {
      return new Map([
        ...prevHouses,
        [house.id, {
          ...house,
          floors: Array.from({ length: house.totalFloors }, (_, index) => ({
            level: index + 1,
            floorId: generateUUID(),
            color: house.color,
          })),
        }],
      ]);
    });
  };

  const updateHouse = (house: House) => {
    // setHouses(houses.map((h) => (h.id === house.id ? house : h)));
  };

  const deleteHouse = (id: string) => {
    // setHouses(houses.filter((h) => h.id !== house.id));
    setHouses((prevHouses) => {
      const newHouses = new Map(prevHouses);
      newHouses.delete(id);
      return newHouses;
    });
  };

  const contextvalue: HouseContextType = {
    savedLocation,
    setSavedLocation: handleSavedLocation,
    houses,
    getHousesByLocation,
    addHouse,
    updateHouse,
    deleteHouse,
    selectedHouse,
    setSelectedHouse: handleSelectHouse
  };

  return (
    <HouseContext.Provider value={contextvalue}>
      {children}
    </HouseContext.Provider>
  );
};

export const useHouseContext = () => {
  const context = useContext(HouseContext);
  if (context === undefined) {
    throw new Error("useHouseContext must be used within a HouseProvider");
  }
  return context;
};
