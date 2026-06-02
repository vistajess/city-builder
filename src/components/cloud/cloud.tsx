import { useEffect, useState } from "react";
import "./cloud.css";

type CloudProps = {
  size: number;
  top: string;
  opacity: number;
};

export const Cloud = ({ size, top, opacity }: CloudProps) => {
  // Deterministic initial left position (consistent on SSR and first client paint)
  // Seeded from size so each cloud starts at a distinct spread position.
  const [randomLeftPosition] = useState(() => (size % 100) + 1);
  const [randomFloatClass, setRandomFloatClass] = useState("animate-slide");

  useEffect(() => {
    // Only the animation class randomises post-mount (pure CSS, no layout shift)
    const floatClasses = [
      "animate-slide",
      "animate-slide-right",
      "animate-slide-across",
      "animate-slide-bounce",
    ];
    const randomFloatIndex = Math.floor(Math.random() * floatClasses.length);
    setRandomFloatClass(floatClasses[randomFloatIndex]);
  }, []);

  // Parallax depth cues: smaller/further clouds get a slight blur and softer shadow
  const depthBlur = size < 140 ? 2 : size < 170 ? 1 : 0;
  const filterValue = [
    "drop-shadow(0 6px 6px rgba(40, 50, 70, 0.18))",
    depthBlur > 0 ? `blur(${depthBlur}px)` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={`absolute z-10 ${randomFloatClass}`}
      style={{
        width: `${size}px`,
        opacity: opacity,
        top: top,
        left: `${randomLeftPosition}vw`,
        filter: filterValue,
      }}
    >
      <svg viewBox="0 0 64 32" width={size} height={size * 0.5} fill="#fdfdff">
        <circle cx="16" cy="16" r="16" />
        <circle cx="32" cy="12" r="12" />
        <circle cx="48" cy="16" r="16" />
        <circle cx="40" cy="20" r="14" />
        <rect x="10" y="16" width="44" height="10" rx="5" />
      </svg>
    </div>
  );
};
