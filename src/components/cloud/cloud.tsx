import { useEffect, useState } from "react";
import "./cloud.css";

type CloudProps = {
  size: number;
  top: string;
  opacity: number;
};

export const Cloud = ({
  size,
  top,
  opacity,
}: CloudProps) => {
  const [randomLeftPosition, setRandomLeftPosition] = useState(0);
  const [randomFloatClass, setRandomFloatClass] = useState("animate-slide");
  
  useEffect(() => {
    const floatClasses = ['animate-slide', 'animate-slide-right', 'animate-slide-across', 'animate-slide-bounce'];
    const randomFloatIndex = Math.floor(Math.random() * floatClasses.length);
    setRandomFloatClass(floatClasses[randomFloatIndex]);
    setRandomLeftPosition(Math.floor(Math.random() * 100) + 1);
  }, []);

  return (
    <div
      className={`absolute z-10 ${randomFloatClass}`}
      style={{
        width: `${size}px`,
        opacity: opacity,
        top: top,
        left: `${randomLeftPosition}vw`
      }}
    >
      <svg viewBox="0 0 64 32" width={size} height={size * 0.5} fill="white">
        <circle cx="16" cy="16" r="16" />
        <circle cx="32" cy="12" r="12" />
        <circle cx="48" cy="16" r="16" />
        <circle cx="40" cy="20" r="14" />
        <rect x="10" y="16" width="44" height="10" rx="5" />
      </svg>
    </div>
  );
};
