"use client";
import { useMemo } from "react";
import { Cloud } from "../components/cloud";
import { HouseList } from "../components/house/house-list";
import Overview from "../components/overview/overview";
import styles from "./page.module.css";
import { Toaster } from "../components/ui/sonner";
import { SkyBackground } from "../components/sky-background";
import { useHouseContext } from "../contexts/house-context";
export default function Home() {
  const { savedLocation } = useHouseContext();
  const clouds = useMemo(
    () => [
      { size: 150, top: "25%", duration: 22, opacity: 0.7, direction: "left" },
      { size: 120, top: "45%", duration: 28, opacity: 0.9, direction: "right" },
      { size: 140, top: "80%", duration: 25, opacity: 0.8, direction: "left" },
      { size: 170, top: "10%", duration: 30, opacity: 0.8, direction: "left" },
      { size: 200, top: "65%", duration: 32, opacity: 0.6, direction: "right" },
    ],
    []
  );
  return (
    <>
      <main>
        <Toaster />
        <Overview />

        {/* <div className={`${styles.sky}`}></div> */}
        <SkyBackground weatherCode={savedLocation?.weather?.icon || "01d"} />
        <div className={`absolute h-[50vh] w-full top-0 overflow-hidden`}>
          {clouds.map((cloud, index) => (
            <Cloud key={index} {...cloud} />
          ))}
        </div>
        <HouseList />
        <div className={`${styles.ground}`}></div>
      </main>
    </>
  );
}
