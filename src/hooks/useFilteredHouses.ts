import { useHouseData } from "@/src/contexts/house-data.context";
import { useHouseActions } from "@/src/contexts/house-actions.context";
import { useMemo } from "react";

export const useFilteredHouses = (locationId?: string) => {
  const { houses, savedLocation } = useHouseData();
  const { getHousesByLocation } = useHouseActions();

  const activeLocationId = locationId || savedLocation?.id;

  const filteredHouses = useMemo(() => {
    if (!activeLocationId) return new Map();
    return getHousesByLocation(activeLocationId);
  }, [activeLocationId, getHousesByLocation, houses]);

  return { filteredHouses };
};