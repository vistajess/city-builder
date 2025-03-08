import { motion } from "framer-motion";

type CloudProps = {
  size: number;
  top: string;
  duration: number;
  opacity: number;
  direction: string;
};

export const Cloud = ({
  size,
  top,
  duration,
  opacity,
  direction,
}: CloudProps) => {
  const isLeftToRight = direction === "left";

  return (
    <motion.div
      className="absolute"
      style={{
        width: `${size}px`,
        top: top,
        opacity: opacity,
        left: isLeftToRight ? "-150px" : "100vw",
      }}
      animate={{ x: isLeftToRight ? "100vw" : "-150px" }}
      transition={{ repeat: Infinity, duration: duration, ease: "linear" }}
    >
      <svg viewBox="0 0 64 32" width={size} height={size * 0.5} fill="white">
        <circle cx="16" cy="16" r="16" />
        <circle cx="32" cy="12" r="12" />
        <circle cx="48" cy="16" r="16" />
        <circle cx="40" cy="20" r="14" />
        <rect x="10" y="16" width="44" height="10" rx="5" />
      </svg>
    </motion.div>
  );
};
