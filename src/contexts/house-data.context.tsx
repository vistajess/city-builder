import { createContext, useContext } from "react";
import { House } from "../types/house";
import { Location } from "../types/location";
import { Floor } from "../types/floor";

export interface HouseData {
  houses: Map<string, House>;
  selectedHouse: House | null;
  savedLocation: Location | null;
  selectedFloor: Floor | null;
}

export const HouseDataContext = createContext<HouseData | null>({
  houses: new Map(),
  selectedHouse: null,
  savedLocation: null,
  selectedFloor: null,
});

export const useHouseData = () => {
  const context = useContext(HouseDataContext);
  if (!context) {
    throw new Error('useHouseData must be used within HouseProvider');
  }
  return context;
};