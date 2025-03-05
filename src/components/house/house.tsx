import styles from "./house.module.css";

export const House = () => {
  return (
    <div className={styles["house-container"]}>
      <div className={styles.roof}></div>
      <div className={styles.body}>
        <div className={styles.window}></div>
        <div className={styles.door}></div>
      </div>
    </div>
  );
};

House.Floor = () => {
  return (
    <div className={styles["floor-container"]}>
      <div className={styles.window}></div>
      <div className={styles.door}></div>
    </div>
  );
};
