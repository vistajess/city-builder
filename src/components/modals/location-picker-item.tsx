import { useFilteredHouses } from "@/src/hooks/useFilteredHouses";
import { Location } from "@/src/types/location";

export const LocationPickerItem = ({ location }: { location: Location }) => {
  const { filteredHouses } = useFilteredHouses(location.id);

  return (
    <div>
      <span className={filteredHouses.size > 0 ? "font-bold" : "font-normal"}>
        {location.name}, {location.country} {`(${filteredHouses.size} houses)`}
      </span>
    </div>
  );
};
