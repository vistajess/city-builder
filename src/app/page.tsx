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

  // Three-tier parallax: near (big, opaque) → mid → far (small, faint, blurred via Cloud component).
  // All tops ≤ 35% so none are clipped by the 55vh overflow-hidden cloud container.
  const clouds = useMemo(
    () => [
      { size: 200, top: "8%",  opacity: 0.85 }, // near
      { size: 170, top: "18%", opacity: 0.80 },
      { size: 150, top: "12%", opacity: 0.60 }, // mid
      { size: 140, top: "28%", opacity: 0.55 },
      { size: 120, top: "22%", opacity: 0.40 }, // far
      { size: 110, top: "35%", opacity: 0.35 },
    ],
    []
  );
  return (
    <>
      <main className={`${styles.main} bg-sky-200`}>
        {selectedFloor?.floorId && <ManageFloorModal ref={manageFloorModalRef} />}
        <Toaster />
        <Overview />

        <SkyBackground weatherCode={savedLocation?.weather?.icon || "01d"} />
        <div className={`fixed h-[55vh] w-full top-0 overflow-hidden`}>
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
