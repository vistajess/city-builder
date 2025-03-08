import { useFilteredHouses } from "@/src/hooks/useFilteredHouses";
import { House as HouseType } from "@/src/types/house";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { House } from "./house";

export const HouseList = () => {
  const { filteredHouses } = useFilteredHouses();
  const housesArray: HouseType[] = Array.from(filteredHouses.values());
  const CONTAINER_WIDTH = 1200;
  const CONTAINER_HEIGHT = 700;
  const HOUSE_WIDTH = 200;

  const Row = ({ index, style }: ListChildComponentProps) => (
    <div className="react-window-row flex flex-row" style={style}>
      <House
        key={housesArray[index].id}
        houseId={housesArray[index].id}
        floors={housesArray[index].floors}
      />
    </div>
  );

  return (
    <div className="absolute bottom-[150px] w-full max-h-[calc(100vh-150px)] overflow-y-hidden overflow-x-auto flex flex-row items-end h-[700px] overflow-hidden">
      <div className="flex gap-8  h-[700px] ml-10 w-full align-center justify-center">
        <List
          layout="horizontal"
          height={CONTAINER_HEIGHT} // 700px Visible height
          width={CONTAINER_WIDTH} // limit to only the width of the container 1200px
          itemCount={housesArray.length} // Total number of houses
          itemSize={HOUSE_WIDTH} // width of each house (px)
          overscanCount={2}
          className="react-window-list"
        >
          {Row}
        </List>
      </div>
    </div>
  );
};
