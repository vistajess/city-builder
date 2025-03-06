import { useHouseContext } from "@/src/contexts/house-context";
import { useRef } from "react";
import { House } from "./house";
export const HouseList = () => {
  const { houses } = useHouseContext();
  const housesArray = Array.from(houses.entries());

  return (
    <div
      className="absolute bottom-[150px] w-full max-h-[calc(100vh-150px)] overflow-y-auto flex flex-row gap-4 p-4 h-[500px]"
    >
      {housesArray.map(([houseId, house], index) => (
        <House key={houseId} index={index} floors={house.floors} />
      ))}
    </div>
  );
};
