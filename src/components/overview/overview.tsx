"use client";
import { useFilteredHouses } from "@/src/hooks/useFilteredHouses";
import { ModalRef } from "@/src/types/modal";
import { useRef, useState } from "react";
import { useHouseContext } from "../../contexts/house-context";
import LocationPickerModal from "../modals/location-picker-modal";
import { ManageHouseModal } from "../modals/manage-house-modal";
import { HouseDetails } from "./house-details";
import { LocationWeatherDetails } from "./location-weather-details";
import { ShowHide } from "./show-hide";

const Overview = () => {
  const { savedLocation } = useHouseContext();
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);
  const LocationPickerModalRef = useRef<ModalRef>(null);
  const manageHouseModalRef = useRef<ModalRef>(null);
  const { filteredHouses } = useFilteredHouses();

  const openManageHouseModal = () => {
    manageHouseModalRef.current?.openModal();
  };

  const openLocationPickerModal = () => {
    LocationPickerModalRef.current?.openModal();
  };

  const handleHideOverview = () => {
    setIsOverviewVisible(!isOverviewVisible);
  };

  const totalFloors = Array.from(filteredHouses.values()).reduce(
    (acc, house) => acc + (house.floors?.length || 0),
    0
  );

  return (
    <>
      <LocationPickerModal ref={LocationPickerModalRef} />

      {savedLocation && (
        <div className={`absolute top-5 right-5 z-10`}>
          <div className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center z-10">
            <ShowHide
            isOverviewVisible={isOverviewVisible}
            toggleShowHide={handleHideOverview}
          />
        </div>

        <ManageHouseModal ref={manageHouseModalRef} />

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
            openManageHouseModal={openManageHouseModal}
            openLocationPickerModal={openLocationPickerModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
