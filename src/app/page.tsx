"use client";
import { HouseList } from "../components/house/house-list";
import Overview from "../components/overview/overview";
export default function Home() {
  return (
    <>
      <main>
        <Overview />

        <HouseList />
      </main>
    </>
  );
}
