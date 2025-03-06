"use client";
import { useMemo } from "react";
import { Cloud } from "../components/cloud";
import { HouseList } from "../components/house/house-list";
import Overview from "../components/overview/overview";
import styles from "./page.module.css";
export default function Home() {
  const clouds = useMemo(
    () => [
      { size: 100, top: "10%", duration: 30, opacity: 0.8, direction: "left" },
      { size: 150, top: "25%", duration: 35, opacity: 0.7, direction: "right" },
      { size: 120, top: "45%", duration: 28, opacity: 0.9, direction: "left" },
      { size: 170, top: "65%", duration: 32, opacity: 0.6, direction: "right" },
      { size: 140, top: "80%", duration: 30, opacity: 0.8, direction: "left" },
    ],
    []
  );
  return (
    <>
      <main>
        <Overview />

        <div
          className={`${styles.sky} relative h-screen w-full bg-blue-200 flex justify-center items-end overflow-hidden`}
        >
          <div className={`absolute h-[50vh] w-full top-0 overflow-hidden`}>
            {clouds.map((cloud, index) => (
              <Cloud key={index} {...cloud} />
            ))}
          </div>
          <div
            className={`${styles.ground} ground absolute bottom-0 w-full h-[150px] bg-green-700`}
          ></div>
          <HouseList />
        </div>
      </main>
    </>
  );
}
