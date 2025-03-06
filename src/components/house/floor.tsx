import { Floor as FloorType } from "@/src/types/floor";
import styles from "./house.module.css";

export const Floor = ({ floor }: { floor: FloorType }) => {
  // return the number of windows based on the floor level
  const windowCount = floor.level === 1 ? 1 : 2;
  const Windows =
    windowCount === 1 ? (
      <div className={`${styles.window} ${styles.one}`}></div>
    ) : (
      <>
        <div className={`${styles.window} ${styles.one}`}></div>
        <div className={`${styles.window} ${styles.two}`}></div>
      </>
    );
  return (
    <div className={styles["floor-container"]}>
      <div
        className={`${styles.floor}`}
        style={{ backgroundColor: floor.color }}
      >
        <div>{floor.level}</div>
        {Windows}
        {floor.level === 1 && <div className={styles.door}></div>}
      </div>
    </div>
  );
};
