"use client";
import { useHouseData } from "@/src/contexts/house-data.context";
import { useFilteredHouses } from "@/src/hooks/useFilteredHouses";
import { ModalRef } from "@/src/types/modal";
import { lazy, Suspense, useCallback, useMemo, useRef, useState } from "react";
import { HouseDetails } from "./house-details";
import { LocationWeatherDetails } from "./location-weather-details";
import { ShowHide } from "./show-hide";

// Lazy load the location picker modal
const LocationPickerModal = lazy(() => import("../modals/location-picker-modal"));
// Lazy load the house management modal
const ManageHouseModal = lazy(() => import("../modals/manage-house-modal").then(mod => ({
  default: mod.ManageHouseModal
})));

const Overview = () => {
  const { savedLocation } = useHouseData();
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);
  const locationPickerModalRef = useRef<ModalRef>(null);
  const { filteredHouses } = useFilteredHouses();

  const manageHouseModalRef = useRef<ModalRef>(null);

  const handleOpenManageHouseModal = useCallback(() => {
    manageHouseModalRef.current?.openModal();
  }, []);

  const handleOpenLocationPickerModal = useCallback(() => {
    locationPickerModalRef.current?.openModal();
  }, []);

  const handleHideOverview = useCallback(() => {
    setIsOverviewVisible(!isOverviewVisible);
  }, [isOverviewVisible]);

  const totalFloors = useMemo(() => {
    return Array.from(filteredHouses.values()).reduce(
      (acc, house) => acc + (house.floors?.length || 0),
      0
    );
  }, [filteredHouses]);

  return (
    <>
      <Suspense fallback={null}>
        <LocationPickerModal ref={locationPickerModalRef} />
      </Suspense>
      <Suspense fallback={null}>
        <ManageHouseModal ref={manageHouseModalRef} />
      </Suspense>
      {savedLocation && (
        <div className={`fixed top-5 right-5 z-30`}>
          <div className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center z-10">
            <ShowHide
              isOverviewVisible={isOverviewVisible}
              toggleShowHide={handleHideOverview}
            />
          </div>
          <div
            className={`w-[370px] transition-all duration-300 ${
              isOverviewVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <LocationWeatherDetails savedLocation={savedLocation} />
            <HouseDetails
              houses={filteredHouses}
              savedLocation={savedLocation}
              totalFloors={totalFloors}
              openManageHouseModal={handleOpenManageHouseModal}
              openLocationPickerModal={handleOpenLocationPickerModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
