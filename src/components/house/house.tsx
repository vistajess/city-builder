import { Floor as FloorType } from "@/src/types/floor";
import { FloorList } from "./floor-list";
import styles from "./house.module.css";

export const House = ({
  houseId,
  floors,
}: {
  houseId: string;
  floors: FloorType[];
}) => {
  const reversedFloors = [...floors].reverse();

  return (
    <>
      <div className={`${styles["house-container"]}`}>
        <FloorList floors={reversedFloors} houseId={houseId} />
      </div>
    </>
  );
};
