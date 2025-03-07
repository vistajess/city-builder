import { useFilteredHouses } from "@/src/hooks/useFilteredHouses";
import { House } from "./house";

export const HouseList = () => {
  const { filteredHouses } = useFilteredHouses();

  return (
    <div
      className="absolute bottom-[150px] w-full max-h-[calc(100vh-150px)] overflow-y-hidden overflow-x-auto flex flex-row items-end h-[700px] overflow-hidden"
    >
      <div className="flex gap-8  h-[500px] ml-10">
        {Array.from(filteredHouses).map(([houseId, house]) => (
          <House key={houseId} houseId={houseId} floors={house.floors} />
        ))}
      </div>
    </div>
  );
};
