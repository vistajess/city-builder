import { Floor } from "./floor";
import { Location } from "./location";

export interface House {
  id: string;
  name: string;
  color: string;
  floors: Floor[];
  location: Location;
}


export interface HouseFormData {
  name: string;
  floors: number;
  color: string;
}

export interface HouseFormErrors {
  name?: string;
  floors?: string;
  color?: string;
}