'use client';
import { WEATHER_ICONS_MAPPER } from "../constants/weather";
import { useHouseContext } from "../contexts/house-context";

const MainHeader = () => {
  const { savedLocation } = useHouseContext();
  console.log(savedLocation);
  if (!savedLocation) return <></>;

  const Icon = WEATHER_ICONS_MAPPER[savedLocation?.weather?.icon as string];
  return (
    <>
      <div className="bg-blue-400 text-white rounded-sm rounded-bl-none rounded-br-none p-4 w-[350px] ml-4 mt-4 border border-gray-200">

        <div className="flex justify-between items-center mb-3">
          <div>
            <div className="text-3xl font-bold">{savedLocation?.name}</div>
            <div className="font-medium capitalize">{savedLocation?.weather?.description}</div>
            <div className="font-sm capitalize">{savedLocation?.latitude}, {savedLocation?.longitude}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-20 h-20 rounded-full flex items-center justify-center">
              <Icon />
            </div>
            <div className="font-medium text-2xl capitalize">{savedLocation?.weather?.temperature}°C</div>
          </div>
        </div>
      </div>
      <div className="p-4 border-tl-none border-tr-none border-b-none border-r-none border-l-2 shadow-md border-gray-200 w-[350px] ml-4">
        <div className="flex flex-row gap-1 justify-between">
          <div className="flex items-center w-1/2 gap-2">
            <div className="text-sm font-medium">Houses:</div>
            <div className="font-bold">10</div>
          </div>
          <div className="flex items-center w-1/2 gap-2">
            <div className="text-sm font-medium">Floors:</div>
            <div className="font-bold">20</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainHeader;
