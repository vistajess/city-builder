import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { Floor as FloorType } from "@/src/types/floor";
import styles from "./house.module.css";
import { Floor } from "./floor";
import {
  WrenchScrewdriverIcon,
  TrashIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { useHouseContext } from "@/src/contexts/house-context";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const FloorList = ({
  floors,
  houseId,
}: {
  floors: FloorType[];
  houseId: string;
}) => {
  const { selectedHouse, setSelectedHouse } = useHouseContext();

  const MAX_VISIBLE_FLOORS = 5;

  const Row = ({ index, style }: ListChildComponentProps) => (
    <div style={style}>
      <Floor floor={floors[index]} />
    </div>
  );

  const handleSelectHouse = () => {
    console.log("select house");
    setSelectedHouse(houseId);
  };

  const handleDeleteHouse = () => {
    console.log("delete house");
  };

  return (
    <div
      className="relative"
      style={{
        height:
          floors.length <= MAX_VISIBLE_FLOORS
            ? `${floors.length * 80}px`
            : undefined,
      }}
    >
      <Popover>
        <PopoverTrigger asChild>
          <div className={`${styles.roof}`} onClick={handleSelectHouse}>
          </div>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-80">
          <FloorList.RoofPopover />
        </PopoverContent>
      </Popover>
      <List
        height={500} // Visible height
        width={200} // Full width
        itemCount={floors.length} // Total number of floors
        itemSize={80} // Height per row (px)
        className={
          selectedHouse?.id === houseId
            ? `${styles["floor-list-wrapper"]} ${styles["selected-house"]}`
            : `${styles["floor-list-wrapper"]}`
        }
      >
        {Row}
      </List>
    </div>
  );
};

FloorList.RoofPopover = () => {
  const { deleteHouse, selectedHouse } = useHouseContext();

  const handleDeleteHouse = () => {
    if (selectedHouse) {
      deleteHouse(selectedHouse.id);
    }
  };

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">House Details</h4>
        <p className="text-sm text-muted-foreground">
          See the details of the house.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Name</Label>
          {selectedHouse?.name}
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxWidth">Number of floors</Label>
          {selectedHouse?.totalFloors}
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Color</Label>
          {selectedHouse?.color}
        </div>
        <div className="flex gap-2 mt-3 items-center justify-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 transition-all"
                  // onClick={openManageHouseModal}
                >
                  <WrenchScrewdriverIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open a manage house modal and edit the house details</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 transition-all"
                  // onClick={openManageHouseModal}
                >
                  <CubeTransparentIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Clone the selected house</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 transition-all"
                  onClick={handleDeleteHouse}
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete the selected house</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};
