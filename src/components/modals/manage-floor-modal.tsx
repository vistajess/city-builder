import { COLORS } from "@/src/constants/color";
import { useHouseActions } from "@/src/contexts/house-actions.context";
import { useHouseData } from "@/src/contexts/house-data.context";
import { forwardRef, useImperativeHandle, useState } from "react";
import { BlockPicker } from "react-color";
import { useModal } from "../../hooks/useModal";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { BaseModal } from "./base-modal";
import styles from "./manage-house-modal.module.css";

export const ManageFloorModal = forwardRef((props, ref) => {
  const { selectedFloor } = useHouseData();
  const { setSelectedFloor, updateFloor } = useHouseActions();
  const { isOpen, setIsOpen } = useModal(false);
  const [colorPickerValue, setColorPickerValue] = useState<string>(
    selectedFloor?.color || "#f5f5dc"
  );


  useImperativeHandle(ref, () => ({
    openModal() {
      setIsOpen(true);
    },
    closeModal() {
      setIsOpen(false);
      setSelectedFloor(null);
    },
  }));

  // Events

  const handleSaveClick = () => {
    updateFloor({
      ...selectedFloor,
      houseId: selectedFloor?.houseId || "",
      houseName: selectedFloor?.houseName || "",
      floorId: selectedFloor?.floorId || "",
      level: selectedFloor?.level || 0,
      color: colorPickerValue,
    });
    setIsOpen(false);
    setSelectedFloor(null);
  };

  const handleCancelClick = () => {
    setIsOpen(false);
    setSelectedFloor(null);
  };

  const handleColorChange = (color: { hex: string }) => {
    setColorPickerValue(color.hex);

  };

  const footerChildren = (
    <div className="flex gap-2">
      <Button onClick={handleSaveClick}>Save</Button>
      <Button onClick={handleCancelClick}>Cancel</Button>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Edit Floor Color"
      description="Customize your floor color based on your preferences"
      footerChildren={footerChildren}
    >
      <div className="grid gap-4 py-4">
        <form>
          <div className="flex flex-row align-center justify-flex-start mb-4">
            <div className="grid gap-2 w-1/2">
              <Label htmlFor="name">House Name</Label>
              <div>{selectedFloor?.houseName}</div>
            </div>
            <div className="grid gap-2 w-1/2">
              <Label htmlFor="name">Floor Level</Label>
              <div>{selectedFloor?.level}</div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="color">Color</Label>
            <BlockPicker
              colors={COLORS}
              color={colorPickerValue}
              onChangeComplete={handleColorChange}
              className={`w-full ${styles["color-picker"]}`}
            />
          </div>
        </form>
      </div>
    </BaseModal>
  );
});

ManageFloorModal.displayName = "ManageHouseModal";