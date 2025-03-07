"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { generateUUID } from "../lib/id-generator";
import { House } from "../types/house";
import { Location } from "../types/location";
interface HouseContextType {
  savedLocation: Location | null;
  setSavedLocation: (location: Location) => void;
  houses: Map<string, House>;
  getHousesByLocation: (locationId: string) => Map<string, House>;
  addHouse: (house: House) => void;
  cloneHouse: (id: string) => void;
  updateHouse: (house: House) => void;
  deleteHouse: (id: string) => void;
  selectedHouse: House | null;
  setSelectedHouse: (id: string) => void;
}

export const HouseContext = createContext<HouseContextType>({
  savedLocation: null,
  setSavedLocation: () => {},
  houses: new Map<string, House>(),
  getHousesByLocation: () => new Map<string, House>(),
  addHouse: () => {},
  cloneHouse: () => {},
  updateHouse: () => {},
  deleteHouse: () => {},
  selectedHouse: null,
  setSelectedHouse: () => {}
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

    if (house) {
      setSelectedHouse(house);
    }
  };

  const getHousesByLocation = useCallback((locationId: string) => {
    return new Map(
      [...houses].filter(([, house]) => house.location.id === locationId)
    );
  }, [houses]);

  const addHouse = (house: House, isClone: boolean = false) => {
    const houseId = isClone ? generateUUID() : house.id;
    const houseName = isClone ? `${house.name} (Copy)` : house.name;

    setHouses((prevHouses) => {
      return new Map([
        ...prevHouses,
        [
          houseId,
          {
            ...house,
            name: houseName,
            floors: Array.from({ length: house.totalFloors }, (_, index) => ({
              level: index + 1,
              floorId: generateUUID(),
              color: house.color,
            })),
          },
        ],
      ]);
    });
  };

  const cloneHouse = (id: string) => {
    const house = houses.get(id);

    if (house) {
      addHouse(house, true);
    }
  };

  const updateHouse = (house: House) => {
    console.log("updateHouse", house);
    // setHouses(houses.map((h) => (h.id === house.id ? house : h)));
  };

  const deleteHouse = (id: string) => {
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
    cloneHouse,
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
