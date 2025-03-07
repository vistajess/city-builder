import { useHouseContext } from "@/src/contexts/house-context";
import { Floor as FloorType } from "@/src/types/floor";
import {
  CubeTransparentIcon,
  TrashIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { Label } from "@radix-ui/react-label";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Floor } from "./floor";
import styles from "./house.module.css";
import { FC } from "react";

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
          <div className={`${styles.roof}`} onClick={handleSelectHouse}></div>
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

FloorList.RoofPopover = (() => {
  const { deleteHouse, selectedHouse, cloneHouse } = useHouseContext();

  const handleDeleteHouse = () => {
    if (selectedHouse) {
      deleteHouse(selectedHouse.id);
      toast.success("House deleted successfully");
    }
  };

  const handleCloneHouse = () => {
    if (selectedHouse) {
      cloneHouse(selectedHouse.id);
      toast.success("House cloned successfully");
    }
  };

  return (
    <>
      <div className="grid gap-4">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">House Details</h4>
          <p className="text-sm text-muted-foreground">
            See the details of the house.
          </p>
        </div>
        <div className="grid gap-2">
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="width">Name</Label>
            {selectedHouse?.name}
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="maxWidth">Number of floors</Label>
            {selectedHouse?.totalFloors}
          </div>
          <div className="flex gap-2 mt-3 items-center justify-center">
            <TooltipProvider>
              <Tooltip disableHoverableContent>
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
                  <p>Edit the house details</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip disableHoverableContent>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 transition-all"
                    onClick={handleCloneHouse}
                  >
                    <CubeTransparentIcon className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clone the selected house</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip disableHoverableContent>
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
    </>
  );
}) as FC;

FloorList.RoofPopover.displayName = "FloorList.RoofPopover";

