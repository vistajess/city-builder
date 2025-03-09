"use client";
import { useEffect, useMemo, useRef } from "react";
import { Cloud } from "../components/cloud/cloud";
import { HouseList } from "../components/house/house-list";
import { ManageFloorModal } from "../components/modals/manage-floor-modal";
import Overview from "../components/overview/overview";
import { SkyBackground } from "../components/sky-background/sky-background";
import { Toaster } from "../components/ui/sonner";
import { useHouseData } from "../contexts/house-data.context";
import { ModalRef } from "../types/modal";
import styles from "./page.module.css";

export default function Home() {
  const { savedLocation, selectedFloor } = useHouseData();
  const manageFloorModalRef = useRef<ModalRef>(null);

  useEffect(() => {
    if (selectedFloor?.floorId) {
      manageFloorModalRef.current?.openModal();
    }
  }, [selectedFloor]);

  const clouds = useMemo(
    () => [
      { size: 150, top: "25%", opacity: 0.4 },
      { size: 120, top: "85%", opacity: 0.7 },
      { size: 120, top: "70%", opacity: 0.7 },
      { size: 140, top: "30%", opacity: 0.8 },
      { size: 170, top: "10%", opacity: 0.8 },
      { size: 200, top: "65%", opacity: 0.6 },
    ],
    []
  );
  return (
    <>
      <main className={`${styles.main} bg-blue-950`}>
        {selectedFloor?.floorId && <ManageFloorModal ref={manageFloorModalRef} />}
        <Toaster />
        <Overview />

        <SkyBackground weatherCode={savedLocation?.weather?.icon || "01d"} />
        <div className={`fixed h-[65vh] w-full top-0 overflow-hidden`}>
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
