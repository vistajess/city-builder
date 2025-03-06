"use client";
import { useRef, useState } from "react";
import { useHouseContext } from "../../contexts/house-context";
import { ManageHouseModal } from "../modals/manage-house-modal";
import { HouseDetails } from "./house-details";
import { LocationWeatherDetails } from "./location-weather-details";
import { ShowHide } from "./show-hide";
import LocationPickerModal from "../modals/location-picker-modal";
import { ModalRef } from "@/src/types/modal";

const Overview = () => {
  const { savedLocation, houses } = useHouseContext();
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);
  const LocationPickerModalRef = useRef<ModalRef>(null);
  const manageHouseModalRef = useRef<ModalRef>(null);

  const openManageHouseModal = () => {
    manageHouseModalRef.current?.openModal();
  };

  const openLocationPickerModal = () => {
    LocationPickerModalRef.current?.openModal();
  };

  const handleHideOverview = () => {
    setIsOverviewVisible(!isOverviewVisible);
  };


  const totalFloors = Array.from(houses.values()).reduce(
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
            houses={houses}
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
