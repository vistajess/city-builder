import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { Floor as FloorType } from "@/src/types/floor";
import styles from "./house.module.css";
import { Floor } from "./floor";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";


export const FloorList = ({ floors }: { floors: FloorType[] }) => {

  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style}>
      <Floor floor={floors[index]} />
    </div>
  );

  return (
    <div>
      
      <div className={`${styles.roof}`} >
        <WrenchScrewdriverIcon className={`${styles["wrench-screwdriver-icon"]}`} />
      </div>
      <List
        height={320} // Visible height
        width={200} // Full width
        itemCount={floors.length} // Total number of floors
        itemSize={80} // Height per row (px)
        className={`${styles["floor-list-wrapper"]}`}
      >
        {Row}
      </List>
    </div>
  );
};