import { forwardRef, useImperativeHandle, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { BaseModal } from "./base-modal";
import { useHouseContext } from "@/src/contexts/house-context";
import { generateUUID } from "@/src/lib/id-generator";
import { HouseFormData, HouseFormErrors } from "@/src/types/house";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";
import { BlockPicker } from "react-color";
import styles from "./manage-house-modal.module.css";

export const ManageHouseModal = forwardRef((props, ref) => {
  const { addHouse, savedLocation } = useHouseContext();
  const { isOpen, setIsOpen } = useModal(false);
  const [color, setColor] = useState<string>("#000000");
  const [errors, setErrors] = useState<HouseFormErrors>({});
  const [formData, setFormData] = useState<HouseFormData>({
    name: "",
    totalFloors: 0,
    color: "#000000",
  });
  console.log(errors);
  useImperativeHandle(ref, () => ({
    openModal() {
      setIsOpen(true);
      setFormData({
        name: "",
        totalFloors: 0,
        color: "#000000",
      });
      setErrors({});
      setColor("#000000");
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

  const handleOnchange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleColorChange = (color: any) => {
    setColor(color.hex);
    setFormData({
      ...formData,
      color: color.hex,
    });
  };

  const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (validateForm()) {
      addHouse(buildHouseData());
      toast.success("House added successfully");
      setIsOpen(false);
      console.log("house added", buildHouseData());
    }
  };

  const buildHouseData = () => {
    return {
      id: generateUUID(),
      name: formData.name,
      totalFloors: formData.totalFloors,
      color: formData.color,
      // pass empty array for now as we will add floors in the context
      floors: [],
      location: savedLocation as any,
    };
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
          <form onSubmit={(e) => handleSaveClick(e)}>
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
                  onChange={(e) => handleOnchange(e, "totalFloors")}
                />
                {errors.totalFloors && (
                  <p className="text-red-700 text-sm">{errors.totalFloors}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                {/* <Input id="color" placeholder="Color" onChange={(e) => handleOnchange(e, "color")} /> */}

                <BlockPicker
                  colors={[
                    "#D9E3F0",
                    "#F47373",
                    "#4169E1",
                    "#697689",
                    "#37D67A",
                    "#2CCCE4",
                    "#555555",
                    "#DCE775",
                    "#FF8A65",
                    "#BA68C8",
                    "#D6D6D6",
                    "#C2B280",
                    "#F5F5DC",
                    "#89CFF0",
                    "#D3D3D3",
                    "#FF6961",
                    "#800000",
                    "#FF6347",
                    "#008080",
                    "#CC5500",
                    "#967BB6",
                    "#708238"
                  ]}
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
      <Toaster />
    </>
  );
});
