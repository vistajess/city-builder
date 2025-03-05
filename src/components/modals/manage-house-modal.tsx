import { forwardRef, useImperativeHandle, useState } from "react";
import { useModal } from "../../hooks/useModal";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { BaseModal } from "./base-modal";
import { useHouseContext } from "@/src/contexts/house-context";
import { generateUUID } from "@/src/lib/id-generator";
import { House, HouseFormData, HouseFormErrors } from "@/src/types/house";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

export const ManageHouseModal = forwardRef((props, ref) => {

  const { addHouse, savedLocation } = useHouseContext();
  const { isOpen, setIsOpen } = useModal(false);
  const [errors, setErrors] = useState<HouseFormErrors>({});
  const [formData, setFormData] = useState<HouseFormData>({
    name: '',
    floors: 0,
    color: ''
  });
  console.log(errors);
  useImperativeHandle(ref, () => ({
    openModal() {
      setIsOpen(true);
      setFormData({
        name: '',
        floors: 0,
        color: ''
      });
      setErrors({});
    },
    closeModal() {
      setIsOpen(false);
    }
  }));

  const validateForm = (): boolean => {
    const newErrors: HouseFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.floors <= 0 || formData.floors > 400) {
      newErrors.floors = 'Floors must be greater than 0 and less than 400';
    }

    if (!formData.color) {
      newErrors.color = 'Color is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value
    });
  }

  const handleSaveClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (validateForm()) {
      addHouse(buildHouseData());
      toast.success("House added successfully");
      setIsOpen(false);
      console.log("house added", buildHouseData());
    }
  }

  const buildHouseData = (): House => {
    return {
      id: generateUUID(),
      name: formData.name,
      floors: Array.from({ length: formData.floors }, (_, index) => ({
        id: generateUUID(),
        name: `Floor ${index + 1}`,
        color: formData.color
      })),
      color: formData.color,
      location: savedLocation as any
    }
  }

  const footerChildren = (
    <>
      <div className="flex gap-2">
        <Button onClick={handleSaveClick}>Save</Button>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
      </div>
    </>
  )

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
                <Input id="name" placeholder="House name" onChange={(e) => handleOnchange(e, "name")} />
                {errors.name && <p className="text-red-700 text-sm" >
                  {errors.name}
                </p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="floors">Number of floors</Label>
                <Input id="floors" type="number" max="400" placeholder="Number of floors" onChange={(e) => handleOnchange(e, "floors")} />
                {errors.floors && <p className="text-red-700 text-sm" >
                  {errors.floors}
                </p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <Input id="color" placeholder="Color" onChange={(e) => handleOnchange(e, "color")} />
                {errors.color && <p className="text-red-700 text-sm" >
                  {errors.color}
                </p>}
              </div>
            </div>
          </form>
        </div>
      </BaseModal>
      <Toaster />
    </>
  );
});
