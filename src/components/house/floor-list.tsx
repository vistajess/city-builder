import { useHouseActions } from "@/src/contexts/house-actions.context";
import { useHouseData } from "@/src/contexts/house-data.context";
import { Floor as FloorType } from "@/src/types/floor";
import { useCallback, useRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Floor } from "./floor";
import styles from "./house.module.css";
import { RoofPopover } from "./roof-popover";

type FloorListProps = {
  floors: FloorType[];
  houseId: string;
};

export const FloorList = ({ floors, houseId }: FloorListProps) => {
  const { houses, selectedHouse } = useHouseData();
  const { setSelectedHouse, setSelectedFloor } = useHouseActions();
  const itemRefs = useRef(new Map<HTMLElement, string>());
  const MAX_VISIBLE_FLOORS = 5;

  const handleSelectHouse = useCallback(() => {
    setSelectedHouse(houseId);
  }, [houseId, setSelectedHouse]);

  const handlePointerDownOutside = useCallback(() => {
    setSelectedHouse(null);
  }, [setSelectedHouse]);

  // attach event listener to the container
  // execute event delegation to find the floor id
  const handleFloorClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    let target = event.target as HTMLElement;
    while (target && !itemRefs.current.has(target)) {
      target = target.parentElement as HTMLElement;
    }

    const floorId = itemRefs.current.get(target);
    if (floorId !== undefined) {
      const findFloor =
        houses
          .get(houseId)
          ?.floors.find((floor) => floor.floorId === floorId) || null;
      setSelectedFloor(findFloor);
    }
  }, [houses, houseId, setSelectedFloor]);

  return (
    <>
      <div
        className="relative"
        style={{
          height:
            floors.length <= MAX_VISIBLE_FLOORS
              ? `${floors.length * 80}px`
              : undefined,
        }}
      >
        <Popover open={selectedHouse?.id === houseId}>
          <PopoverTrigger asChild>
            <div className={`${styles.roof}`} onClick={handleSelectHouse}>
              <div className="absolute z-20 size-4 top-10 left-5">
                <div className="absolute z-20 h-full w-full inset-0 rounded-full bg-orange-300 animate-ping [animation-duration:1.25s] [animation-iteration-count:10] opacity-50"></div>
                <div className="relative z-10 size-4 rounded-full bg-orange-300 opacity-25"></div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-80"
            onPointerDownOutside={handlePointerDownOutside}
          >
            <RoofPopover />
          </PopoverContent>
        </Popover>
        <div className="floor-list-container">
          <div onClick={handleFloorClick}>
            {floors.map((floor) => (
              <div
                key={floor.floorId}
                ref={(el) => {
                  if (el) itemRefs.current.set(el, floor.floorId);
                }}
                className="floor-row"
              >
                <Floor key={floor.floorId} floor={floor} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
