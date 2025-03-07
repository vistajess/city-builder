import { COLORS } from "@/src/constants/color";
import { AVAILABLE_LOCATIONS } from "@/src/constants/location";
import { useHouseContext } from "@/src/contexts/house-context";
import { generateUUID } from "@/src/lib/id-generator";
import { HouseFormData, HouseFormErrors } from "@/src/types/house";
import { forwardRef, useImperativeHandle, useState } from "react";
import { BlockPicker } from "react-color";
import { toast } from "sonner";
import { useModal } from "../../hooks/useModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { BaseModal } from "./base-modal";
import styles from "./manage-house-modal.module.css";

export const ManageHouseModal = forwardRef((props, ref) => {
  const { addHouse, savedLocation } = useHouseContext();
  const { isOpen, setIsOpen } = useModal(false);
  const [color, setColor] = useState<string>("#f5f5dc");
  const [errors, setErrors] = useState<HouseFormErrors>({});
  const [formData, setFormData] = useState<HouseFormData>({
    name: "",
    totalFloors: 1,
    color: "#f5f5dc",
  });

  useImperativeHandle(ref, () => ({
    openModal() {
      setIsOpen(true);
      setFormData({
        name: "",
        totalFloors: 1,
        color: "#f5f5dc",
      });
      setErrors({});
      setColor("#f5f5dc");
    },
    closeModal() {
      setIsOpen(false);
    },
  }));

  const validateForm = (): boolean => {
    const newErrors: HouseFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (formData.totalFloors <= 0 || formData.totalFloors > 400) {
      newErrors.totalFloors = "Floors must be greater than 0 and less than 400";
    }

    if (!formData.color) {
      newErrors.color = "Color is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildHouseData = () => {
    return {
      id: generateUUID(),
      name: formData.name,
      totalFloors: formData.totalFloors,
      color: formData.color,
      // pass empty array for now as we will add floors in the context
      floors: [],
      location: savedLocation || AVAILABLE_LOCATIONS[0],
    };
  };

  // Events

  const handleOnchange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleColorChange = (color: { hex: string }) => {
    setColor(color.hex);
    setFormData({
      ...formData,
      color: color.hex,
    });
  };

  const handleSaveClick = () => {
    if (validateForm()) {
      addHouse(buildHouseData());
      toast.success("House added successfully");
      setIsOpen(false);
      console.log("house added", buildHouseData());
    }
  };

  const footerChildren = (
    <>
      <div className="flex gap-2">
        <Button onClick={handleSaveClick}>Save</Button>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      </div>
    </>
  );

  return (
    <>
      <BaseModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add House"
        description="Customize your house based on your preferences"
        footerChildren={footerChildren}
      >
        <div className="grid gap-4 py-4">
          <form>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="House name"
                  onChange={(e) => handleOnchange(e, "name")}
                />
                {errors.name && (
                  <p className="text-red-700 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="totalFloors">Number of floors</Label>
                <Input
                  id="totalFloors"
                  type="number"
                  max="400"
                  placeholder="Number of floors"
                  defaultValue={formData.totalFloors}
                  onChange={(e) => handleOnchange(e, "totalFloors")}
                />
                {errors.totalFloors && (
                  <p className="text-red-700 text-sm">{errors.totalFloors}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <BlockPicker
                  colors={COLORS}
                  color={color}
                  onChangeComplete={handleColorChange}
                  className={`w-full ${styles["color-picker"]}`}
                />
                {errors.color && (
                  <p className="text-red-700 text-sm">{errors.color}</p>
                )}
              </div>
            </div>
          </form>
        </div>
      </BaseModal>
    </>
  );
});

ManageHouseModal.displayName = "ManageHouseModal";
