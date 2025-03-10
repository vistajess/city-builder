import { FC, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { useHouseActions } from "@/src/contexts/house-actions.context";
import { useHouseData } from "@/src/contexts/house-data.context";
import { ModalRef } from "@/src/types/modal";
import {
  CubeTransparentIcon,
  TrashIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { useRef } from "react";
import { toast } from "sonner";
import { ManageHouseModal } from "../modals/manage-house-modal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Alert } from "../alert";

export const RoofPopover = (() => {
  const { deleteHouse, cloneHouse, setSelectedHouse } = useHouseActions();
  const { selectedHouse } = useHouseData();
  const manageHouseModalRef = useRef<ModalRef>(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleDeleteHouse = () => {
    setAlertOpen(true);
  };

  const handleConfirmDeleteHouse = () => {
    if (selectedHouse) {
      deleteHouse(selectedHouse.id);
      toast.success("House deleted successfully");
      setSelectedHouse(null);
    }
    setAlertOpen(false);
  };

  const handleCloneHouse = () => {
    if (selectedHouse) {
      cloneHouse(selectedHouse.id);
      toast.success("House cloned successfully");
      setSelectedHouse(null);
    }
  };

  const handleOpenLocationPickerModal = () => {
    manageHouseModalRef.current?.openModal();
  };

  return (
    <>
      <Alert
        title="Delete House"
        description={`Are you sure you want to delete this house ${selectedHouse?.name}?`}
        onConfirm={handleConfirmDeleteHouse}
        onCancel={() => setAlertOpen(false)}
        open={alertOpen}
        setOpen={setAlertOpen}
      />
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
