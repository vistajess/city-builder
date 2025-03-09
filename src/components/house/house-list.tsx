import { useFilteredHouses } from "@/src/hooks/useFilteredHouses";
import { House as HouseType } from "@/src/types/house";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { House } from "./house";
import { useEffect, useMemo, useState } from "react";
import { useHouseData } from "@/src/contexts/house-data.context";
import styles from "./house.module.css";

export const HouseList = () => {
  const { filteredHouses } = useFilteredHouses();
  const { savedLocation } = useHouseData();
  const housesArray: HouseType[] = Array.from(filteredHouses.values());
  const [windowWidth, setWindowWidth] = useState(0);
  const MARGIN_BUFFER = 300;
  const FLOOR_HEIGHT_IN_PX = 80;

  const maxTopFloor = useMemo(() => housesArray.reduce((max, house) => {
    return Math.max(max, house.floors.length);
  }, 0), [housesArray]);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "instant",
      });
    }, 500);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [savedLocation]);

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
    <div className="relative w-full flex flex-row items-end z-20">
      <List
        layout="horizontal"
        height={(maxTopFloor * FLOOR_HEIGHT_IN_PX) + MARGIN_BUFFER} // 700px Visible height
        width={windowWidth || 1200} // limit to only the width of the container 1200px
        itemCount={housesArray.length} // Total number of houses
        itemSize={300} // width of each house (px)
        overscanCount={2}
        className={`${styles["react-window-house-list"]} min-h-[calc(100vh-150px)]`}
      >
        {Row}
      </List>
    </div>
  );
};
