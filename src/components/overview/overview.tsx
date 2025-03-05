'use client';
import { PencilIcon, PlusIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { WEATHER_ICONS_MAPPER } from "../../constants/weather";
import { useHouseContext } from "../../contexts/house-context";
import { ManageHouseModal } from "../modals/manage-house-modal";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { ShowHide } from "./show-hide";

const Overview = () => {
  const { savedLocation, houses } = useHouseContext();
  const [isOverviewVisible, setIsOverviewVisible] = useState(true);
  const manageHouseModalRef = useRef<any>(null);

  const openManageHouseModal = () => {
    manageHouseModalRef.current?.openModal();
  }

  const handleHideOverview = () => {
    setIsOverviewVisible(!isOverviewVisible);
  }

  if (!savedLocation) return <></>;

  const Icon = WEATHER_ICONS_MAPPER[savedLocation.weather?.icon || '01d'];
  const totalFloors = houses.reduce((acc, house) => acc + (house.floors?.length || 0), 0);

  return (
    <div className={`absolute top-5 right-5 z-10`}>
      <div className="absolute top-0 right-0 w-10 h-10 flex items-center justify-center z-10">
        <ShowHide isOverviewVisible={isOverviewVisible} toggleShowHide={handleHideOverview} />
      </div>
      <ManageHouseModal ref={manageHouseModalRef} />
      <div className={`w-[350px] transition-all duration-300 ${isOverviewVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-blue-400 text-white rounded-t-lg p-4 shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-3xl font-bold flex items-center gap-2">
                {savedLocation.name}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 hover:bg-blue-500/50 transition-colors disabled:opacity-50"
                      >
                        {/* <ArrowPathIcon className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} /> */}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Refresh weather data</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

              </div>
              <div className="font-medium capitalize">{savedLocation.weather?.description || 'No weather data'}</div>
              <div className="font-sm capitalize mt-1 flex items-center gap-2">
                <Badge variant="secondary" className="bg-blue-500/50 border-none">
                  {savedLocation.latitude}, {savedLocation.longitude}
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-blue-500/20 backdrop-blur-sm">
                <Icon />
              </div>
              <div className="font-medium text-2xl capitalize">{savedLocation.weather?.temperature ?? '--'}°C</div>
              {savedLocation.weather && (
                <div className="text-sm flex gap-2 mt-1">
                  <Badge variant="secondary" className="bg-blue-500/50 border-none">
                    Humidity: {savedLocation.weather.humidity}%
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-500/50 border-none">
                    Wind: {savedLocation.weather.windSpeed}m/s
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </div>
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
            >
              <PencilIcon className="w-4 h-4" />
              Edit Houses
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview;
