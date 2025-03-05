import { useHouseContext } from "@/src/contexts/house-context";
import { House } from "./house";
export const HouseList = () => {
  const { houses } = useHouseContext();

  return (
    <div className="h-screen">
      <div className="house-list absolute bottom-0 h-auto flex gap-10 w-full">
        {houses.map((house, index) => (
          <House key={house.id} index={index} floors={house.floors} />
        ))}
      </div>
    </div>
  );
};
