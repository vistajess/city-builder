import { Floor } from "./floor";
import { Location } from "./location";

export interface House {
  id: string;
  name: string;
  color: string;
  totalFloors: number;
  floors: Floor[];
  location: Location;
}


export interface HouseFormData {
  name: string;
  color: string;
  totalFloors: number;
}

export interface HouseFormErrors {
  name?: string;
  totalFloors?: string;
  color?: string;
}