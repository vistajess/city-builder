import { useEffect, useState } from "react";
import { WEATHER_BG_MAPPER } from "../constants/weather";
import "./sky-background.css";

export const SkyBackground = ({ weatherCode }: { weatherCode: string }) => {
  const [bgClass, setBgClass] = useState("bg-clear-day");

  useEffect(() => {
    setBgClass(WEATHER_BG_MAPPER[weatherCode] || "bg-clear-day");
  }, [weatherCode]);

  return (
    <div className={`h-screen w-screen ${bgClass} flex justify-center items-center`}>
      {bgClass === "bg-sunny" && (
        <>
          <div className="sun"></div>
          <div className="sun-rays"></div>
        </>
      )}
    </div>
  );
};
