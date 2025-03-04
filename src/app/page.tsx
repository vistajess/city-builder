'use client';
import LocationPicker from "../components/location-picker";

export default function Home() {

  const handleLocationSave = () => {
    console.log("proceed");
  }

  return (
    <> 
      <main>
        <LocationPicker onSave={handleLocationSave} />

        <div className="flex flex-col gap-4">
          
        </div>
      </main>
    </>
  );
}
