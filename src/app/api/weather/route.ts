import { NextResponse } from "next/server";
import { OPEN_WEATHER_API_URL } from "@/src/constants/weather";

// for testing purposes
const DUMMY_OPENWEATHER_API_KEY = '97f0e02d9fe5cd86ffcb6813fba49d62';

export async function GET(req: Request, res: Response) {

  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Missing latitude or longitude parameters" }, { status: 400 });
  }

  // Keep it in .env
  const apiKey = process.env.OPENWEATHER_API_KEY || DUMMY_OPENWEATHER_API_KEY; 

  const url = `${OPEN_WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  return NextResponse.json(data);
}