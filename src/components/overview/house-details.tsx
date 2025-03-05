import { MapPinIcon } from "@heroicons/react/24/outline";

import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import { TooltipContent } from "../ui/tooltip";

import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { House } from "@/src/types/house";
import { Location } from "@/src/types/location";

export const HouseDetails = ({
  houses,
  savedLocation,
  totalFloors,
  openManageHouseModal,
  openLocationPickerModal,
}: {
  houses: House[];
  savedLocation: Location;
  totalFloors: number;
  openManageHouseModal: () => void;
  openLocationPickerModal: () => void;
}) => {
  return (
    <div className="bg-white p-4 rounded-b-lg shadow-lg w-[350px] border-blue-300/20">
      <TooltipProvider>
        <div className="flex flex-row gap-1 justify-between">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center w-1/2 gap-2 cursor-help hover:text-blue-500 transition-colors">
                <div className="text-sm font-medium">Houses:</div>
                <div className="font-bold">{houses.length}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total number of houses in {savedLocation.name}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center w-1/2 gap-2 cursor-help hover:text-blue-500 transition-colors">
                <div className="text-sm font-medium">Floors:</div>
                <div className="font-bold">{totalFloors}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Total number of floors across all houses</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
      <div className="flex gap-2 mt-3">
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 transition-all"
          onClick={openManageHouseModal}
        >
          <PlusIcon className="w-4 h-4" />
          Add House
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 transition-all"
          onClick={openLocationPickerModal}
        >
          <MapPinIcon className="w-4 h-4" />
          Change Location
        </Button>
      </div>
    </div>
  );
};
