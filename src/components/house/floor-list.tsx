import { useHouseContext } from "@/src/contexts/house-context";
import { Floor as FloorType } from "@/src/types/floor";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Floor } from "./floor";
import styles from "./house.module.css";
import { RoofPopover } from "./roof-popover";

type FloorListProps = {
  floors: FloorType[];
  houseId: string;
}

export const FloorList = ({
  floors,
  houseId,
}: FloorListProps) => {
  const { selectedHouse, setSelectedHouse } = useHouseContext();

  const MAX_VISIBLE_FLOORS = 5;

  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style}>
      <Floor floor={floors[index]} />
    </div>
  );

  const handleSelectHouse = () => {
    setSelectedHouse(houseId);
  };

  const handlePointerDownOutside = () => {
    setSelectedHouse(null);
  };

  return (
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
        <PopoverContent side="top" className="w-80" onPointerDownOutside={handlePointerDownOutside}>
          <RoofPopover />
        </PopoverContent>
      </Popover>
      <List
        height={500} // Visible height
        width={200} // Full width
        itemCount={floors.length} // Total number of floors
        itemSize={80} // Height per row (px)
        className={
          selectedHouse?.id === houseId
            ? `${styles["floor-list-wrapper"]} ${styles["selected-house"]}`
            : `${styles["floor-list-wrapper"]}`
        }
      >
        {Row}
      </List>
    </div>
  );
};
