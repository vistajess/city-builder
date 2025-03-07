import { useFilteredHouses } from "@/src/hooks/useFilteredHouses";

export const LocationPickerItem = ({ locationId, locationName }: { locationId: string, locationName: string }) => {

  const { filteredHouses } = useFilteredHouses(locationId);
  
  return <div>{`${locationName} (${filteredHouses.size} houses)`}</div>;
};
