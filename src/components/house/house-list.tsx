import { useHouseContext } from "@/src/contexts/house-context";
import { House } from "./house";
export const HouseList = () => {
  const { houses,selectedHouse } = useHouseContext();
  const housesArray = Array.from(houses.entries());
  console.log("selectedHouse", selectedHouse);
  return (
    <div
      className="absolute bottom-[150px] w-full max-h-[calc(100vh-150px)] overflow-y-hidden overflow-x-auto flex flex-row items-end h-[700px] overflow-hidden"
    >
      <div className="flex gap-8  h-[500px] ml-10">
        {housesArray.map(([houseId, house], index) => (
          <House key={houseId} houseId={houseId} floors={house.floors} />
        ))}
      </div>
    </div>
  );
};
