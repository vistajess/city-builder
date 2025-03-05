'use client';
import { useRef } from "react";
import LocationPicker, { LocationPickerRef } from "../components/location-picker";
import MainHeader from "../components/main-header";


export default function Home() {
  const locationPickerRef = useRef<LocationPickerRef>(null);

  const handleLocationSave = () => {
    console.log("proceed");
  }

  const openLocationPicker = () => {
    locationPickerRef.current?.openModal();
  }

  return (
    <> 
      <main>
        <MainHeader />
        <LocationPicker ref={locationPickerRef} onSave={handleLocationSave} />

        <div className="flex flex-col gap-4">
          <button onClick={openLocationPicker}>Open Location Picker</button>
        </div>
      </main>
    </>
  );
}
