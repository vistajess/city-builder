import { Floor as FloorType } from "@/src/types/floor";
import { FloorList } from "./floor-list";
import styles from "./house.module.css";

export const House = ({
  index,
  floors,
}: {
  index: number;
  floors: FloorType[];
}) => {
  const reversedFloors = [...floors].reverse();

  const MARGIN_BETWEEN_HOUSES = 30;
  const HOUSE_WIDTH = 200;

  return (
    <>
      <div
        className={`${styles["house-container"]}`}
        style={{ left: `${index * HOUSE_WIDTH + MARGIN_BETWEEN_HOUSES}px` }}
      >
        
        <FloorList floors={reversedFloors} />
      </div>
    </>
  );
};
