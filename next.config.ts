import type { NextConfig } from "next";
import { OPEN_WEATHER_IMAGE_URL } from "./src/constants/weather";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'openweathermap.org',
        port: '',
        pathname: '/**',
      },
    ],
  }
};

export default nextConfig;
