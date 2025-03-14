import { createContext, useContext } from "react";
import { House } from "../types/house";
import { Location } from "../types/location";
import { Floor } from "../types/floor";

export interface HouseActions {
  addHouse: (house: House) => void;
  updateHouse: (house: House) => void;
  deleteHouse: (id: string) => void;
  setSelectedHouse: (id: string | null) => void;
  setSelectedFloor: (floor: Floor | null) => void;
  setSavedLocation: (location: Location) => void;
  cloneHouse: (id: string) => void;
  getHousesByLocation: (locationId: string) => Map<string, House>;
  updateFloor: (floor: Floor) => void;
}

export const HouseActionsContext = createContext<HouseActions | null>(null);

export const useHouseActions = () => {
  const context = useContext(HouseActionsContext);
  if (!context) {
    throw new Error("useHouseActions must be used within HouseProvider");
  }
  return context;
};
