"use client";
import { useCallback, useMemo, useRef } from "react";
import { Cloud } from "../components/cloud";
import { HouseList } from "../components/house/house-list";
import { ManageHouseModal } from "../components/modals/manage-house-modal";
import Overview from "../components/overview/overview";
import { SkyBackground } from "../components/sky-background";
import { Toaster } from "../components/ui/sonner";
import { useHouseData } from "../contexts/house-data.context";
import { ModalRef } from "../types/modal";
import styles from "./page.module.css";

export default function Home() {
  const { savedLocation } = useHouseData();
  const manageHouseModalRef = useRef<ModalRef>(null);

  const handleOpenManageHouseModal = useCallback(() => {
    manageHouseModalRef.current?.openModal();
  }, []);
  
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
        <Overview openManageHouseModal={handleOpenManageHouseModal} />
        
        <ManageHouseModal ref={manageHouseModalRef} />

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
