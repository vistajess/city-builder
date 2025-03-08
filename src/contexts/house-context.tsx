"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { generateUUID } from "../lib/id-generator";
import { House } from "../types/house";
import { Location } from "../types/location";
import {
  HouseActions,
  HouseActionsContext,
  useHouseActions,
} from "./house-actions.context";
import {
  HouseData,
  HouseDataContext,
  useHouseData,
} from "./house-data.context";
import { LOCAL_STORAGE_KEYS } from "../constants/local-storage";
import { useDebounce } from "use-debounce";

export const useHouseContext = () => {
  return {
    ...useHouseData(),
    ...useHouseActions(),
  };
};

type HousesContextProviderProps = {
  children: React.ReactNode;
};

export const HouseContextProvider = ({
  children,
}: HousesContextProviderProps) => {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [savedLocation, setSavedLocation] = useState<Location | null>(null);
  const [houses, setHouses] = useState<Map<string, House>>(() => {
    if (typeof window === "undefined") return new Map();
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.HOUSES);
      return stored ? new Map(JSON.parse(stored)) : new Map();
    } catch {
      return new Map();
    }
  });
  const [debouncedHouses] = useDebounce(houses, 500); // Debounce to reduce writes

  // Persist to localStorage when `debouncedHouses` changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.HOUSES,
        JSON.stringify([...debouncedHouses])
      );
    }
  }, [debouncedHouses]);

  const handleSavedLocation = useCallback(
    (location: Location) => {
      setSavedLocation(location);
    },
    [setSavedLocation]
  );

  const handleSelectHouse = useCallback(
    (houseId: string | null) => {
      if (houseId === null) {
        setSelectedHouse(null);
        return;
      }

      const house = houses.get(houseId);

      if (house) {
        setSelectedHouse(house);
      }
    },
    [houses]
  );

  const getHousesByLocation = useCallback(
    (locationId: string) => {
      return new Map(
        [...houses].filter(([, house]) => house.location.id === locationId)
      );
    },
    [houses]
  );

  const addHouse = useCallback(
    (house: House, isClone: boolean = false) => {
      const houseId = isClone ? generateUUID() : house.id;
      const houseName = isClone ? `${house.name} (Copy)` : house.name;

      setHouses((prevHouses) => {
        return new Map([
          ...prevHouses,
          [
            houseId,
            {
              ...house,
              id: houseId,
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
    },
    [houses]
  );

  const cloneHouse = useCallback(
    (id: string) => {
      const house = houses.get(id);

      if (house) {
        addHouse(house, true);
      }
    },
    [houses, addHouse]
  );

  const updateHouse = useCallback(
    (house: House) => {
      setHouses((prevHouses) => {
        return new Map([
          ...prevHouses,
          [
            house.id,
            {
              ...house,
              floors: Array.from({ length: house.totalFloors }, (_, index) => ({
                level: index + 1,
                floorId: generateUUID(),
                color: house.color,
              })),
            },
          ],
        ]);
      });
    },
    [houses]
  );

  const deleteHouse = useCallback(
    (id: string) => {
      setHouses((prevHouse) => {
        const newHouses = new Map(prevHouse);
        newHouses.delete(id);
        return newHouses;
      });
    },
    [houses]
  );

  const data: HouseData = useMemo(
    () => ({
      houses,
      selectedHouse,
      savedLocation,
    }),
    [houses, selectedHouse, savedLocation]
  );

  const actions: HouseActions = useMemo(
    () => ({
      addHouse,
      cloneHouse,
      updateHouse,
      deleteHouse,
      setSelectedHouse: handleSelectHouse,
      setSavedLocation: handleSavedLocation,
      getHousesByLocation,
    }),
    [
      addHouse,
      cloneHouse,
      updateHouse,
      deleteHouse,
      handleSelectHouse,
      handleSavedLocation,
      getHousesByLocation,
    ]
  );

  return (
    <HouseDataContext.Provider value={data}>
      <HouseActionsContext.Provider value={actions}>
        {children}
      </HouseActionsContext.Provider>
    </HouseDataContext.Provider>
  );
};
