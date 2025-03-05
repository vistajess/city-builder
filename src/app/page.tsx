'use client';
import { useRef } from "react";
import MainHeader from "../components/overview/overview";
import LocationPickerModal from "../components/modals/location-picker-modal";
import { ModalRef } from "../types/modal";
import { House } from "../components/house/house";

export default function Home() {
  const LocationPickerModalRef = useRef<ModalRef>(null);

  const handleLocationSave = () => {
    console.log("proceed");
  }

  const openLocationPickerModal = () => {
    LocationPickerModalRef.current?.openModal();
  }

  return (
    <> 
      <main>
        <MainHeader />
        <LocationPickerModal ref={LocationPickerModalRef} onSave={handleLocationSave} />
        <div className="flex justify-center items-center h-screen">
          <House />
        </div>

        {/* <div className="flex flex-col gap-4">
          <button onClick={openLocationPickerModal}>Open Location Picker</button>
        </div> */}
      </main>
    </>
  );
}
