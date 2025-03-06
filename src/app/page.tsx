"use client";
import { HouseList } from "../components/house/house-list";
import Overview from "../components/overview/overview";
export default function Home() {
  return (
    <>
      <main>
        <Overview />
        
        <div className="relative h-screen w-full bg-blue-200 flex justify-center items-end overflow-hidden">
          <div className="absolute bottom-0 w-full h-[150px] bg-green-700"></div>
          <HouseList />
        </div>
      </main>
    </>
  );
}
