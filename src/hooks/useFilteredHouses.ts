import { useHouseContext } from "@/src/contexts/house-context";
import { House as HouseType } from "@/src/types/house";
import { useEffect, useState } from "react";

export const useFilteredHouses = (locationId?: string) => {
  const { houses, getHousesByLocation, savedLocation } = useHouseContext();

  const [filteredHouses, setFilteredHouses] = useState(new Map<string, HouseType>());


  useEffect(() => {
    const activeLocationId = locationId || savedLocation?.id;
    if (activeLocationId) {
      const filteredHouses = getHousesByLocation(activeLocationId);
      setFilteredHouses(filteredHouses);
    }
  }, [savedLocation, houses, locationId, getHousesByLocation]);

  return { filteredHouses };
}
