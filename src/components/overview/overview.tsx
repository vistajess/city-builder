"use client";
import { useFilteredHouses } from "@/src/hooks/useFilteredHouses";
import { ModalRef } from "@/src/types/modal";
import { useCallback, useRef, useState } from "react";
import { useHouseContext } from "../../contexts/house-context";
import LocationPickerModal from "../modals/location-picker-modal";
import { HouseDetails } from "./house-details";
import { LocationWeatherDetails } from "./location-weather-details";
import { ShowHide } from "./show-hide";

const Overview = ({ openManageHouseModal }: { openManageHouseModal: () => void }) => {
  const { savedLocation } = useHouseContext();
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);
  const locationPickerModalRef = useRef<ModalRef>(null);
  const { filteredHouses } = useFilteredHouses();

  const handleOpenManageHouseModal = () => {
    openManageHouseModal();
  };

  const openLocationPickerModal = useCallback(() => {
    locationPickerModalRef.current?.openModal();
  }, []);

  const handleHideOverview = useCallback(() => {
    setIsOverviewVisible(!isOverviewVisible);
  }, [isOverviewVisible]);

  const totalFloors = Array.from(filteredHouses.values()).reduce(
    (acc, house) => acc + (house.floors?.length || 0),
    0
  );

  return (
    <>
      <LocationPickerModal ref={locationPickerModalRef} />

      {savedLocation && (
        <div className={`absolute top-5 right-5 z-10`}>
          <div className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center z-10">
            <ShowHide
            isOverviewVisible={isOverviewVisible}
            toggleShowHide={handleHideOverview}
          />
        </div>
        <div
          className={`w-[350px] transition-all duration-300 ${
            isOverviewVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <LocationWeatherDetails savedLocation={savedLocation} />
          <HouseDetails
            houses={filteredHouses}
            savedLocation={savedLocation}
            totalFloors={totalFloors}
            openManageHouseModal={handleOpenManageHouseModal}
            openLocationPickerModal={openLocationPickerModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
