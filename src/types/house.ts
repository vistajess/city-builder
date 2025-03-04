import { Floor } from "./floor";
import { Location } from "./location";

export interface House {
  id: string;
  name: string;
  floors: Floor[];
  location: Location  ;
}
