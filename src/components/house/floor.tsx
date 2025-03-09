import { Floor as FloorType } from "@/src/types/floor";
import { FC } from "react";
import React from "react";
import styles from "./house.module.css";
import { useHouseData } from "@/src/contexts/house-data.context";

type FloorComponent = React.MemoExoticComponent<({ floor }: { floor: FloorType }) => React.ReactElement> & {
  Normal: FC<{ floor: FloorType; selectedFloor: FloorType | null }>;
  WithDoor: FC<{ floor: FloorType; selectedFloor: FloorType | null }>;
};

export const Floor = React.memo(({ floor }: { floor: FloorType }) => {
  const { selectedFloor } = useHouseData();
  return (
    <div>
      {floor.level === 1 ? (
        <Floor.WithDoor floor={floor} selectedFloor={selectedFloor} />
      ) : (
        <Floor.Normal floor={floor} selectedFloor={selectedFloor} />
      )}
    </div>
  );
}) as FloorComponent;

Floor.displayName = "Floor";

Floor.Normal = React.memo(({
  floor,
  selectedFloor,
}: {
  floor: FloorType;
  selectedFloor: FloorType | null;
}) => {
  return (
    <div
      className={`${styles.floor} ${
        selectedFloor?.floorId === floor.floorId ? styles.selected : ""
      }`}
      style={{ backgroundColor: floor.color }}
    >
      <div className={`${styles.window} ${styles.one}`}></div>
      <div className={`${styles.window} ${styles.two}`}></div>
      <div className={styles.floorNumber}>{floor.level}</div>
    </div>
  );
}) as FC<{ floor: FloorType; selectedFloor: FloorType | null }>;

Floor.Normal.displayName = "Floor.Normal";

Floor.WithDoor = React.memo(({
  floor,
  selectedFloor,
}: {
  floor: FloorType;
  selectedFloor: FloorType | null;
}) => {
  return (
    <div
      className={`${styles.floor} ${
        selectedFloor?.floorId === floor.floorId ? styles.selected : ""
      }`}
      style={{ backgroundColor: floor.color }}
    >
      <div className={`${styles.window} ${styles.one}`}></div>
      <div className={styles.door}></div>
      <div className={styles.floorNumber}>{floor.level}</div>
    </div>
  );
}) as FC<{ floor: FloorType; selectedFloor: FloorType | null }>;

Floor.WithDoor.displayName = "Floor.WithDoor";
