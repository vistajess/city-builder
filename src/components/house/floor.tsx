import { Floor as FloorType } from "@/src/types/floor";
import { FC } from "react";
import styles from "./house.module.css";

export const Floor = ({ floor }: { floor: FloorType }) => {
  return (
    <div className={`${styles["floor-list-wrapper"]}`}>
      {floor.level === 1 ? (
        <Floor.WithDoor floor={floor} />
      ) : (
        <Floor.Normal floor={floor} />
      )}
    </div>
  );
};

Floor.Normal = (({ floor }: { floor: FloorType }) => {
  return (
    <div className={`${styles.floor}`} style={{ backgroundColor: floor.color }}>
      <div className={`${styles.window} ${styles.one}`}></div>
      <div className={`${styles.window} ${styles.two}`}></div>
    </div>
  );
}) as FC<{ floor: FloorType }>;

Floor.Normal.displayName = "Floor.Normal";


Floor.WithDoor = (({ floor }: { floor: FloorType }) => {
  return (
    <div className={`${styles.floor}`} style={{ backgroundColor: floor.color }}>
      <div className={`${styles.window} ${styles.one}`}></div>
      <div className={styles.door}></div>
    </div>
  );
}) as FC<{ floor: FloorType }>;

Floor.WithDoor.displayName = "Floor.WithDoor"; 
