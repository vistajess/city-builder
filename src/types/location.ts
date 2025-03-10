import { House } from "./house";
import { Weather } from "./weather";
export interface Location {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
  weather?: Weather | null;
}

export interface LocationWithHouses extends Location {
  houses: House[];
}
