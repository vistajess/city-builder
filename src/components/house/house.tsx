import { Floor } from "@/src/types/floor";
import styles from "./house.module.css";

export const House = ({
  index,
  floors,
}: {
  index: number;
  floors: Floor[];
}) => {
  const reversedFloors = [...floors].reverse();

  return (
    <>
      <div
        className={`${styles["house-container"]}`}
        style={{ left: `${index * 200}px` }}
      >
        <div className={styles.roof}></div>
        {floors?.length > 0 &&
          reversedFloors.map((floor) => (
            <House.Floor key={floor.floorId} floor={floor} />
          ))}
      </div>
    </>
  );
};

House.Floor = ({ floor }: { floor: Floor }) => {
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
        {Windows}
        {floor.level === 1 && <div className={styles.door}></div>}
      </div>
    </div>
  );
};
