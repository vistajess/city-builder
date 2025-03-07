import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { useHouseContext } from "@/src/contexts/house-context";
import { ModalRef } from "@/src/types/modal";
import { useRef } from "react";
import { toast } from "sonner";
import { ManageHouseModal } from "../modals/manage-house-modal";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { CubeTransparentIcon, TrashIcon } from "@heroicons/react/24/outline";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

export const RoofPopover = (() => {
  const { deleteHouse, selectedHouse, cloneHouse } = useHouseContext();
  const manageHouseModalRef = useRef<ModalRef>(null);

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

  const handleOpenLocationPickerModal = () => {
    manageHouseModalRef.current?.openModal();
  };

  return (
    <>
      <ManageHouseModal ref={manageHouseModalRef} />
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
            <span className="font-medium">{selectedHouse?.name}</span>
          </div>
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="maxWidth">Number of floors</Label>
            <span className="font-medium">{selectedHouse?.totalFloors}</span>
          </div>
          <div className="flex gap-2 mt-3 items-center justify-center">
            <TooltipProvider skipDelayDuration={100000}>
              <Tooltip disableHoverableContent>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1 hover:bg-blue-50 hover:text-blue-500 hover:border-blue-200 transition-all"
                    onClick={handleOpenLocationPickerModal}
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

RoofPopover.displayName = "RoofPopover";
