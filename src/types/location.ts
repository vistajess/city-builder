import { House } from "./house";
import { Weather } from "./weather";
export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  weather?: Weather;
}

export interface LocationWithHouses extends Location {
  houses: House[];
}
